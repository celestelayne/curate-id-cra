export default [
  {
    label: 'pricing tier',
    key: 'catalog',
    filters: [
      {
        id: 1,
        fieldName: 'Venture ($)',
        key: 'venture',
      },
      {
        id: 2,
        fieldName: 'Growth ($$)',
        key: 'growth',
      },
      {
        id: 3,
        fieldName: 'Enterprise ($$$)',
        key: 'enterprise',
      },
    ]
  },
  {
    label: 'category',
    key: 'category',
    filters: [
      {
        id: 4,
        fieldName: 'Workstations',
        key: 'workstations',
      },
      {
        id: 5,
        fieldName: 'Seating',
        key: 'seating',
      },
      {
        id: 6,
        fieldName: 'Mobile',
        key: 'mobile',
      },
      {
        id: 7,
        fieldName: 'Storage',
        key: 'storage',
      },
      {
        id: 8,
        fieldName: 'Tables',
        key: 'tables',
      },
    ]
  },
]
