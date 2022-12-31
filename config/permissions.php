<?php

return [

    'permissions' => [
        'admin.dashboard' => 'Admin Dashboard',

        'admin.roles' => 'Admin Roles',
        'admin.roles.update' => 'Admin Update Roles',
        'admin.roles.delete' => 'Admin Delete Roles',

        'admin.permissions' => 'Admin Permissions',
        'admin.permissions.update' => 'Admin Update Permissions',
        'admin.permissions.delete' => 'Admin Delete Permissions',

        'admin.users' => 'Admin Users',
        'admin.users.update' => 'Admin Update Users',
        'admin.users.delete' => 'Admin Delete Users',
    ],

    'roles' => [
        'user' => [
            'name' => 'User',
        ],

        'staff' => [
            'name' => 'Staff',
            'permissions' => [
                'admin.dashboard',
            ],
        ],

        'admin-users' => [
            'name' => 'Admin Users',
            'permissions' => [
                'admin.users',
                'admin.users.update',
                'admin.users.delete',
            ],
        ],

        'admin-roles' => [
            'name' => 'Admin Roles',
            'permissions' => [
                'admin.roles',
                'admin.roles.update',
                'admin.roles.delete',
            ],
        ],

        'admin-permissions' => [
            'name' => 'Admin Permissions',
            'permissions' => [
                'admin.permissions',
                'admin.permissions.update',
                'admin.permissions.delete',
            ],
        ],
    ]
];
