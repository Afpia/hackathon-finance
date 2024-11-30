<?php

namespace App\Services;

use App\Models\Finance;
use App\Repositories\FinanceRepository;

class FinanceService extends BaseService
{
    private $financeRepository;

    public function __construct(FinanceRepository $financeRepository)
    {
        $this->repo = $financeRepository;
    }
    public function getid($userId)
{
    return Finance::where('user_id', $userId)->get();
}
public function destroy($id)
{
    $financeRecord = Finance::find($id);
    
    if ($financeRecord) {
        $financeRecord->delete();
    }
}
public function update($id, array $data)
{
    $financeRecord = Finance::find($id);
    
    if ($financeRecord) {
        $financeRecord->update($data);
    }
}
}
