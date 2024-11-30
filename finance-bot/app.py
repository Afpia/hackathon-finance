from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
socketio = SocketIO(app)

transactions = []

def get_balance():
    income = sum(t['amount'] for t in transactions if t['type'] == 'доход')
    expenses = sum(t['amount'] for t in transactions if t['type'] == 'расход')
    balance = income - expenses
    return income, expenses, balance

def get_bot_response(user_message):
    if 'добавить' in user_message.lower():
        return "Какую сумму и тип транзакции вы хотите добавить? (например, доход 1000 или расход 500)"
    elif 'расход' in user_message.lower():
        return "Пожалуйста, укажите сумму расхода."
    elif 'доход' in user_message.lower():
        return "Пожалуйста, укажите сумму дохода."
    elif 'баланс' in user_message.lower() or 'сумма' in user_message.lower():
        income, expenses, balance = get_balance()
        return f"Ваши доходы: {income}, расходы: {expenses}, баланс: {balance}"
    elif 'удалить' in user_message.lower():
        return "Введите ID транзакции для удаления."
    elif 'показать все' in user_message.lower():
        return "Я покажу все ваши транзакции."
    elif 'помощь' in user_message.lower() or '/help' in user_message.lower():
        return (
            "Доступные команды:\n"
            "/add - добавить транзакцию\n"
            "/balance - показать баланс\n"
            "/show - показать все транзакции\n"
            "/delete - удалить транзакцию по ID"
        )
    else:
        return "Я вас не понял. Попробуйте еще раз! Для помощи введите /help"

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    return jsonify(transactions)

@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    data = request.json
    description = data.get('description')
    amount = data.get('amount')
    type_ = data.get('type')

    transaction = {
        'id': len(transactions) + 1,  
        'description': description,
        'amount': amount,
        'type': type_
    }
    transactions.append(transaction)
    
    return jsonify(transaction), 201

@app.route('/api/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    global transactions
    transactions = [t for t in transactions if t['id'] != transaction_id]
    return jsonify({"message": "Транзакция удалена"}), 200

@socketio.on('message')
def handle_message(message):
    print('Received message: ', message)
    
    bot_response = get_bot_response(message)
    emit('response', {'message': bot_response}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=5000)
