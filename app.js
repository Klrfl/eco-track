import express from "express";
import path from "node:path";

const __dirname = import.meta.dirname;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/calculate", (req, res) => {
  const { distance, "vehicle-type": vehicleType, ac, laptop } = req.body;

  // what do we do when < 0? idk
  if (!isNumber(distance) || !isNumber(ac) || !isNumber(laptop)) {
    return res.status(400).json({
      success: false,
      message:
        "invalid vehicle distance, ac, or laptop energy usage. Make sure vehicle ac and laptop usage is a valid positive number",
    });
  }

  if (
    typeof vehicleType !== "string" ||
    !["car", "motorcycle"].includes(vehicleType)
  ) {
    return res
      .status(400)
      .json({ success: "false", message: "invalid vehicle type" });
  }

  const { totalEmission, breakdown } = calculateEmission(
    distance,
    vehicleType,
    ac,
    laptop,
  );

  return res.json({
    success: true,
    emisi_total: totalEmission,
    breakdown,
  });
});

app.listen(3000, () => console.log("listening on http://localhost:3000"));

function isNumber(n) {
  if (Number.isNaN(n)) return false;

  const parsed = Number(n);
  return typeof parsed === "number";
}

/**
 * calculates emission
 * @param distance int
 * @param vehicleType "motorcycle" | "car"
 * @param acHours int
 * @param laptopHours int
 * */
function calculateEmission(distance, vehicleType, acHours, laptopHours) {
  // per km
  const VEHICLE_COEFFICIENTS = {
    motorcycle: 0.1,
    car: 0.2,
  };

  // per hour usage
  const DEVICE_COEFFICIENTS = {
    ac: 0.5,
    laptop: 0.05,
  };

  const vehicleEmission = VEHICLE_COEFFICIENTS[vehicleType] * distance;
  const acEmission = DEVICE_COEFFICIENTS["ac"] * acHours;
  const laptopEmission = DEVICE_COEFFICIENTS["laptop"] * laptopHours;
  const totalEmission = vehicleEmission + acEmission + laptopEmission;

  return {
    totalEmission,
    breakdown: {
      kendaraan: vehicleEmission,
      ac: acEmission,
      laptop: laptopEmission,
    },
  };
}
