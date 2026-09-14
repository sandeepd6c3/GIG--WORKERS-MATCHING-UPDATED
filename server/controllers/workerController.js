import Worker from '../models/Worker.js';

export const getWorkers = async (req, res) => {
  const { category, search } = req.query;
  const filter = {};
  if (category) filter.categoryName = { $regex: category, $options: 'i' };
  if (search) filter.title = { $regex: search, $options: 'i' };

  const workers = await Worker.find(filter).populate('userId', 'name email phone avatar');
  res.json({ success: true, count: workers.length, data: workers });
};

export const getWorkerById = async (req, res) => {
  const worker = await Worker.findById(req.params.id).populate('userId', 'name email phone avatar');
  if (!worker) return res.status(404).json({ message: 'Worker not found' });
  res.json(worker);
};

export const updateAvailability = async (req, res) => {
  const worker = await Worker.findOneAndUpdate({ userId: req.user._id }, { isAvailable: req.body.isAvailable }, { new: true });
  res.json({ success: true, isAvailable: worker?.isAvailable });
};
