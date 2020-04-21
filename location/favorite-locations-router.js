const express = require("express");
const router = express.Router();
const { FavoriteLocations } = require("../Classes/favorite-locations");
const { checkBody, locationCheck } = require("../Middleware/locations");
const { Models } = require("../Classes/models");

//new favorite locations DB class
const FaveLocations = new FavoriteLocations();

const locationModel = new Models("locations");

router.get("/", async (req, res, next) => {
    try {
        res.json(await FaveLocations.getFavorites(req.user.id));
    } catch (err) {
        next(err);
    }
});

//middleware check for address in locations DB
router.post("/", checkBody(), locationCheck(), async (req, res, next) => {
    try {
        if (req.addedLocation) {
            res.status(201).json(
                await FaveLocations.add(
                    req.user.id,
                    req.addedLocation.id,
                    req.body.name
                )
            );
        } else {
            res.status(201).json(
                await FaveLocations.add(
                    req.user.id,
                    req.location.id,
                    req.body.name
                )
            );
        }
    } catch (err) {
        next(err);
    }
});

router.delete("/:locationId", async (req, res, next) => {
    try {
        //join tables don't create ID's
        res.json(
            await FaveLocations.delete(req.user.id, req.params.locationId)
        );
    } catch (err) {
        next(err);
    }
});

// passing in a name since join tables do not create id's
router.put(
    "/update/:name",
    checkBody(),
    locationCheck(),
    async (req, res, next) => {
        try {
            const location = {
                user_id: req.user.id,
                name: req.body.name
            };
            if (req.addedLocation) {
                res.json(
                    await FaveLocations.update(req.user.id, req.params.name, {
                        ...location,
                        location_id: req.addedLocation.id
                    })
                );
            } else {
                res.json(
                    await FaveLocations.update(req.user.id, req.params.name, {
                        ...location,
                        location_id: req.location.id
                    })
                );
            }
        } catch (err) {
            next(err);
        }
    }
);

module.exports = router;
