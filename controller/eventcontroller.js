const { Event } = require("../models/eventmodel");

// create events data
const creatEvent = async (req, res) => {
  try {
    const { name, description, date } = req.body;

    if (!name || !date) {
      return res.status(400).json({ error: "Name and Date are required" });
    }

    const event = new Event({
      name,
      description,
      date: new Date(date),
      user: req.user.id,
    });
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// get events data

const getEventsdata = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// update events data

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });
    if (event.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// delete events data

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await event.deleteOne();

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  creatEvent,
  getEventsdata,
  updateEvent,
  deleteEvent,
  // verifyEventOwner
};
