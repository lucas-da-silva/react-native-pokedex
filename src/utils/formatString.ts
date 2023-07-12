const capitalizeFirstLetter = (
  field: { name: string | null },
): string => (field && field.name
  ? field.name.charAt(0).toUpperCase() + field.name.slice(1) : '')

export default capitalizeFirstLetter
