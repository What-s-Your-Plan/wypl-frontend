import { create } from 'zustand';

import { LabelFilterData } from '@/@types/Schedule';

type DateStates = {
  today: Date;
  selectedDate: Date;
  labels: LabelFilterData[];
  selectedLabels: Array<LabelFilterData>;
};

type DateActions = {
  updateToday: () => void;
  setSelectedDate: (date: Date) => void;
  setLabels: (labels: LabelFilterData[]) => void;
  addSelectedLabels: (labelId: LabelFilterData) => void;
  removeSelectedLabels: (labelId: LabelFilterData) => void;
  clearSelectedLabels: () => void;
  setAllSelected: () => void;
};

const useDateStore = create<DateStates & DateActions>()((set, get) => ({
  today: new Date(),
  selectedDate: new Date(),
  calendarSchedules: [],
  labels: [],
  selectedLabels: [],
  updateToday() {
    set({ today: new Date() });
  },
  setSelectedDate: (date: Date) => {
    set({ selectedDate: date });
  },
  setLabels(labels: LabelFilterData[]) {
    set({ labels: labels });
  },
  addSelectedLabels: (newLabel: LabelFilterData) => {
    set((state) => ({
      selectedLabels: [...state.selectedLabels, newLabel],
    }));
  },
  removeSelectedLabels: (newLabel: LabelFilterData) => {
    set((state) => ({
      selectedLabels: state.selectedLabels.filter(
        (label) => label !== newLabel,
      ),
    }));
  },
  clearSelectedLabels: () => {
    set({ selectedLabels: [] });
  },
  setAllSelected: () => {
    set({
      // selectedLabels: get().labels.map((label) => {
      //   return label.id;
      // }),
      selectedLabels: {
        ...get().labels,
      },
    });
  },
}));

export default useDateStore;
