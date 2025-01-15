export const createEventCategoryConfig = {
  title: "Create Event category",
  fields: [
    {
      name: "eventCategory",
      label: "Event category",
      type: "text" as const,
    },
    {
      name: "index",
      label: "Index",
      type: "number" as const,
    },
    {
      name: "image",
      label: "Image",
      type: "file" as const,
    },
  ],
  submitText: "Add Category",
};