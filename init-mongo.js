db.createUser(
    {
        user: "dbUser",
        pwd: "dbPass",
        roles: [
            {
                role: "readWrite",
                db: "todo"
            }
        ]
    }
);