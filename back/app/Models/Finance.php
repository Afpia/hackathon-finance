<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Finance extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'category_id',
        'incomeORexpense',
        'description',
        'type'
    ];
    public function incomeORexpense()
    {
        return $this->hasMany(Category::class);
    }

 
}
