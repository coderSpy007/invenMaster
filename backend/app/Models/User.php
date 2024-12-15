<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

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
        'username',
        'email',
        'password',
        'firstname',
        'lastname',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',  
        'remember_token',  
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',  
        'updated_at' => 'datetime',  
    ];

    /**
     * The default value for the 'role' attribute.
     *
     * @var array
     */
    protected $attributes = [
        'role' => 'user',  // Default value for role, if not provided
    ];

    /**
     * Get the full name of the user (firstname + lastname).
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return $this->firstname . ' ' . $this->lastname;
    }

    /**
     * Encrypt the password before storing it.
     *
     * @param  string  $value
     * @return void
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    /**
     * Accessor for the user's email (example of additional logic).
     *
     * @return string
     */
    public function getEmailAttribute($value)
    {
        return strtolower($value);
    }

    /**
     * Example of defining relationships (e.g., if User has many Posts)
     * 
     * public function posts()
     * {
     *     return $this->hasMany(Post::class);
     * }
     */
}
