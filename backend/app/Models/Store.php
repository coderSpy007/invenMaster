<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'store';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';  

    /**
     * The type of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'int'; 

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'store_name', 
        'user_id',     
    ];

    /**
     * Define the relationship with the User model (foreign key 'user_id').
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    /**
     * Example of custom accessor or mutator (if needed).
     * Example: Get the full store name if needed, or other custom attributes.
     *
     * @return string
     */
    public function getFullStoreNameAttribute()
    {
        return $this->store_name;
    }
}
