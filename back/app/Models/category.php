<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class category extends Model
{
	use HasFactory;

	public function Category()
	{
		return $this->hasMany(Finance::class);
	}
}
