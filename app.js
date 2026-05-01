import express from "express";
import path from "node:path";

const __dirname = import.meta.dirname;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/calculate", (req, res) => {
  const { "vehicle-type": vehicleType, ac, laptop } = req.body;

  if (
    typeof vehicleType !== "string" ||
    !["car", "motorcycle"].includes(vehicleType)
  ) {
    return res
      .status(400)
      .json({ success: "false", message: "invalid vehicle type" });
  }

  const { totalEmission, breakdown } = calculateEmission(
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

/**
 * calculates emission
 * @param vehicleType 'bike' | 'car'
 * @param acHours int
 * @param laptopHours int
 * */
function calculateEmission(vehicleType, ac, laptop) {
  return {
    totalEmission: 10,
    breakdown: {
      kendaraan: 10,
      ac: 10,
      laptop: 10,
    },
  };
}
