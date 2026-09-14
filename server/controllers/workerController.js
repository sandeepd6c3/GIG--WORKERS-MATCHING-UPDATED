import mongoose from 'mongoose';
import Worker from '../models/Worker.js';
import { DEFAULT_VERIFIED_WORKERS } from '../utils/defaultWorkers.js';

export const getWorkers = async (req, res) => {
  try {
    const { category, search } = req.query;
    let workers = [];

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const filter = {};
      if (category) filter.categoryName = { $regex: category, $options: 'i' };
      if (search) filter.title = { $regex: search, $options: 'i' };
      workers = await Worker.find(filter).populate('userId', 'name email phone avatar').maxTimeMS(2000);
    }

    if (!workers || workers.length === 0) {
      workers = [...DEFAULT_VERIFIED_WORKERS];
      if (category) {
        workers = workers.filter(w => w.categoryName.toLowerCase().includes(category.toLowerCase()));
      }
      if (search) {
        workers = workers.filter(w => 
          w.title.toLowerCase().includes(search.toLowerCase()) || 
          w.categoryName.toLowerCase().includes(search.toLowerCase())
        );
      }
    }

    res.json({ success: true, count: workers.length, data: workers });
  } catch (error) {
    res.json({ success: true, count: DEFAULT_VERIFIED_WORKERS.length, data: DEFAULT_VERIFIED_WORKERS });
  }
};

export const getWorkerById = async (req, res) => {
  try {
    let worker = null;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      worker = await Worker.findById(req.params.id).populate('userId', 'name email phone avatar').maxTimeMS(2000);
    }

    if (!worker) {
      worker = DEFAULT_VERIFIED_WORKERS.find(w => w._id === req.params.id);
    }

    if (!worker) return res.status(404).json({ message: 'Worker not found' });
    res.json(worker);
  } catch (error) {
    const fallback = DEFAULT_VERIFIED_WORKERS.find(w => w._id === req.params.id);
    if (fallback) return res.json(fallback);
    res.status(404).json({ message: 'Worker not found' });
  }
};

export const updateAvailability = async (req, res) => {
  try {
    if (typeof req.body.isAvailable !== 'boolean') {
      return res.status(400).json({ message: 'isAvailable boolean is required' });
    }

    let worker = null;
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      worker = await Worker.findOneAndUpdate({ userId: req.user._id }, { isAvailable: req.body.isAvailable }, { new: true });
    }

    res.json({ success: true, isAvailable: req.body.isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
