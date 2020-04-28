exports.up = async function (knex) {
    await knex.schema.createTable("rides", (tbl) => {
        tbl.increments();
        tbl.integer("driver_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.integer("start_location_id")
            .notNullable()
            .references("id")
            .inTable("locations")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.integer("end_location_id")
            .notNullable()
            .references("id")
            .inTable("locations")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.string("status").defaultTo("pending");
    });

    await knex.schema.createTable("rides_riders", (tbl) => {
        tbl.integer("ride_id")
            .notNullable()
            .references("id")
            .inTable("rides")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.integer("rider_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
        tbl.string("status").defaultTo("pending");
        tbl.primary(["rider_id", "ride_id"]);
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("rides_riders");
    await knex.schema.dropTableIfExists("rides");
};
