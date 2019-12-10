import colorConverter from './utils'
import { EXPORT_MASTER_SHEET_ID } from './ExportToSheetsButton'

const GRAY = colorConverter(216, 216, 216)
const LIGHT_GRAY = colorConverter(239, 239, 239)
const DARK_GRAY = colorConverter(217, 217, 217)
const BLACK = colorConverter(0, 0, 0)
const WRAP = 'WRAP'
const CLIP = 'CLIP'

export const generateMemberInfo = ({
  companyName = '',
  moveInDate = '',
  tier = '',
  type = '',
  street = '',
  unitNumber = '',
  suiteNumber = '',
  city = '',
  state = '',
  rentable = '',
  baselineBudget = '',
  upgradeValue = '',
}) => ({
  startColumn: 1,
  startRow: 1,
  columnMetadata: [{ pixelSize: 293 }, { pixelSize: 299 }],
  rowData: [
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Client Info' },
          userEnteredFormat: {
            textFormat: { bold: true },
            borders: {
              top: { style: 'SOLID_THICK', color: BLACK },
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Company Name' },
          userEnteredFormat: {
            borders: {
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: companyName },
          userEnteredFormat: {
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Move-In Date' },
          userEnteredFormat: {
            borders: {
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: moveInDate },
          userEnteredFormat: {
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'FF&E Tier' },
          userEnteredFormat: {
            borders: {
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: tier },
          userEnteredFormat: {
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Project Type' },
          userEnteredFormat: {
            borders: {
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: type },
          userEnteredFormat: {
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
      ],
    },
    {},
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Knotel Property' },
          userEnteredFormat: {
            textFormat: { bold: true },
            borders: {
              top: { style: 'SOLID_THICK', color: BLACK },
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Street' },
          userEnteredFormat: {
            borders: {
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: street },
          userEnteredFormat: {
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Floor:Suite Number' },
          userEnteredFormat: {
            borders: {
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: unitNumber || suiteNumber },
          userEnteredFormat: {
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'City' },
          userEnteredFormat: {
            borders: {
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: city },
          userEnteredFormat: {
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'State' },
          userEnteredFormat: {
            borders: {
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: state },
          userEnteredFormat: {
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Rentable Square Footage' },
          userEnteredFormat: {
            borders: {
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: rentable },
          userEnteredFormat: {
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
      ],
    },
    {},
    {
      values: [
        {
          userEnteredValue: { stringValue: 'DAY 1 FF&E BUDGET SUMMARY' },
          userEnteredFormat: {
            textFormat: { bold: true },
            borders: {
              top: { style: 'SOLID_THICK', color: BLACK },
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Day 1 FF&E Baseline Budget' },
          userEnteredFormat: {
            borders: {
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { numberValue: baselineBudget },
          userEnteredFormat: {
            numberFormat: {
              type: 'CURRENCY'
            },
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Day 1 FF&E Allowance' },
          userEnteredFormat: {
            borders: {
              right: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { formulaValue: '=-(C16*10%)' },
          userEnteredFormat: {
            numberFormat: {
              type: 'CURRENCY'
            },
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Day 1 FF&E Budget Upgrades' },
          userEnteredFormat: {
            borders: {
              left: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { numberValue: upgradeValue },
          userEnteredFormat: {
            numberFormat: {
              type: 'CURRENCY'
            },
            borders: {
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'DAY 1 FF&E BUDGET TARGET' },
          userEnteredFormat: {
            textFormat: { bold: true },
            borders: {
              top: { style: 'SOLID_THICK', color: BLACK },
              left: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { formulaValue: '=sum(C16:C18)' },
          userEnteredFormat: {
            textFormat: { bold: true },
            numberFormat: {
              type: 'CURRENCY'
            },
            borders: {
              top: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'DAY 1 FF&E BUDGET ESTIMATED' },
          userEnteredFormat: {
            textFormat: { bold: true },
            borders: {
              top: { style: 'SOLID_THICK', color: BLACK },
              left: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { formulaValue: "=sum('Export Master'!L3:L)" },
          userEnteredFormat: {
            textFormat: { bold: true },
            numberFormat: {
              type: 'CURRENCY'
            },
            borders: {
              top: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'DAY 1 FF&E BUDGET BALANCE' },
          userEnteredFormat: {
            textFormat: { bold: true },
            borders: {
              top: { style: 'SOLID_THICK', color: BLACK },
              left: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { formulaValue: '=C19-C20' },
          userEnteredFormat: {
            textFormat: { bold: true },
            numberFormat: {
              type: 'CURRENCY'
            },
            borders: {
              top: { style: 'SOLID_THICK', color: BLACK },
              right: { style: 'SOLID_THICK', color: BLACK },
              bottom: { style: 'SOLID_THICK', color: BLACK },
            },
          },
        },
      ],
    },
  ],
})

export const generateFurnitureHeaders = () => ({
  startRow: 1,
  columnMetadata: [
    { pixelSize: 139 },
    { pixelSize: 136 },
    { pixelSize: 219 },
    { pixelSize: 134 },
    { pixelSize: 100 },
    { pixelSize: 100 },
    { pixelSize: 130 },
    { pixelSize: 130 },
    { pixelSize: 194 },
    { pixelSize: 146 },
    { pixelSize: 100 },
    { pixelSize: 95 },
    { pixelSize: 296 },
    { pixelSize: 240 },
  ],
  rowData: [
    {
      values: [
        {
          userEnteredValue: { stringValue: 'Product Location' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'Furniture Tag' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'Design Location' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'Name' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'Vendor' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'Color' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'Dimensions' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'Knotel SKU' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'CSI Code' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'All-in Cost (Per Unit)' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'Order Quantity' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'Total Cost' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'Hyperlink' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { stringValue: 'Notes' },
          userEnteredFormat: {
            textFormat: { bold: true },
            backgroundColor: GRAY,
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
      ],
    },
  ],
})

export const fillFurniture = (items) => ({
  startRow: 2,
  rowData: [
    items.map((value, index) => ({
      values: [
        {
          userEnteredValue: {
            stringValue:
              value.type === 'Off-Platform Items' // sorry to do it, but there is no other way than nested ternary
                ? 'OFF-PLATFORM'
                : value.inWarehouse
                  ? 'IN WAREHOUSE'
                  : 'NON-WAREHOUSE',
          },
          userEnteredFormat: {
            wrapStrategy: WRAP,
          },
        },
        {
          userEnteredValue: { stringValue: value.furnitureTag || '' },
          userEnteredFormat: {
            wrapStrategy: WRAP,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            wrapStrategy: WRAP,
          },
        },
        {
          userEnteredValue: { stringValue: value.name || '' },
          userEnteredFormat: {
            wrapStrategy: WRAP,
          },
        },
        {
          userEnteredValue: { stringValue: value.Vendors && value.Vendors.length
            ? value.Vendors[0].name
            : value.vendor },
          userEnteredFormat: {
            wrapStrategy: WRAP,
          },
        },
        {
          userEnteredValue: { stringValue: value.color || '' },
          userEnteredFormat: {
            wrapStrategy: WRAP,
          },
        },
        {
          userEnteredValue: { stringValue: value.dimensionsImperialWxDxH || '' },
          userEnteredFormat: {
            wrapStrategy: WRAP,
          },
        },
        {
          userEnteredValue: { stringValue: value.knotelSku || value.upcSkuItem }, // decide which sku
          userEnteredFormat: {
            wrapStrategy: CLIP,
          },
        },
        {
          userEnteredValue: { stringValue: value.code }, // code in favor of csiCode should be here
          userEnteredFormat: {
            wrapStrategy: WRAP,
          },
        },
        {
          userEnteredValue: { stringValue: String(value.usTotalCost / 100) },
          userEnteredFormat: {
            wrapStrategy: WRAP,
          },
        },
        {
          userEnteredValue: { stringValue: String(value.quantity) },
        },
        {
          userEnteredValue: { formulaValue: `=I${index + 3}*J${index + 3}` }, // offset from top
        },
        {
          userEnteredValue: { stringValue: value.link || '' },
          userEnteredFormat: {
            wrapStrategy: CLIP,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            wrapStrategy: WRAP,
          },
        },
      ],
    })),
  ],
})

export const generateCostComparsion = (numberOfUniqueVendors) => {
  const sheet = {
    columnMetadata: [{ pixelSize: 100 }, { pixelSize: 132 }, { pixelSize: 305 }, { pixelSize: 100 }],
    rowData: [
      {
        values: [
          {
            pivotTable: {
              source: {
                sheetId: EXPORT_MASTER_SHEET_ID,
                startRowIndex: 1,
                endRowIndex: 1001,
                startColumnIndex: 4,
                endColumnIndex: 12,
              },
              rows: [
                {
                  sourceColumnOffset: 0,
                  sortOrder: 'ASCENDING',
                  showTotals: true,
                },
              ],
              values: [
                {
                  summarizeFunction: 'SUM',
                  sourceColumnOffset: 6,
                },
              ],
            },
          },
          {},
          {
            userEnteredValue: { stringValue: 'Actual PO Vendor Cost (Purchasing to input)' },
            userEnteredFormat: {
              textFormat: { bold: true },
              backgroundColor: LIGHT_GRAY,
              borders: {
                top: { style: 'SOLID', color: BLACK },
                right: { style: 'SOLID', color: BLACK },
                bottom: { style: 'SOLID', color: BLACK },
                left: { style: 'SOLID', color: BLACK },
              },
            },
          },
          {
            userEnteredValue: { stringValue: 'Difference' },
            userEnteredFormat: {
              textFormat: { bold: true },
              backgroundColor: LIGHT_GRAY,
              borders: {
                top: { style: 'SOLID', color: BLACK },
                right: { style: 'SOLID', color: BLACK },
                bottom: { style: 'SOLID', color: BLACK },
                left: { style: 'SOLID', color: BLACK },
              },
            },
          },
        ],
      },
    ],
  }

  for (let i = 0; i < numberOfUniqueVendors; i++) {
    sheet.rowData.push({
      values: [
        {},
        {},
        {
          userEnteredFormat: {
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
        {
          userEnteredValue: { formulaValue: '=IFERROR((C:C-B:B)/B:B,"")' },
          userEnteredFormat: {
            numberFormat: { type: 'PERCENT', pattern: '.00%' },
            borders: {
              top: { style: 'SOLID', color: BLACK },
              right: { style: 'SOLID', color: BLACK },
              bottom: { style: 'SOLID', color: BLACK },
              left: { style: 'SOLID', color: BLACK },
            },
          },
        },
      ],
    })
  }

  return sheet
}

export const generateRcpSchedule = ({ designer = '' }) => ({
  columnMetadata: [
    { pixelSize: 250 },
    { pixelSize: 118 },
    { pixelSize: 192 },
    { pixelSize: 181 },
    { pixelSize: 100 },
    { pixelSize: 100 },
    { pixelSize: 221 },
    { pixelSize: 100 },
  ],
  rowData: [
    {
      values: [
        {
          userEnteredValue: { stringValue: 'RCP SCHEDULE' },
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 18, fontFamily: 'Montserrat' },
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        }
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'DESIGNER' },
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 10, fontFamily: 'Montserrat' },
            backgroundColor: LIGHT_GRAY
          }
        },
        {},
        {
          userEnteredValue: { stringValue: designer },
          userEnteredFormat: {
            textFormat: { fontSize: 10, fontFamily: 'Montserrat' },
          }
        },
      ]
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'PROJECT' },
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 10, fontFamily: 'Montserrat' },
            backgroundColor: LIGHT_GRAY
          }
        },
        {},
        {
          userEnteredValue: { formulaValue: "='Member Info + Budget'!C3" },
          userEnteredFormat: {
            textFormat: { fontSize: 10, fontFamily: 'Montserrat' },
          }
        },
      ]
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'LOCATION' },
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 10, fontFamily: 'Montserrat' },
            backgroundColor: LIGHT_GRAY
          }
        },
        {},
        {
          userEnteredValue: {
            formulaValue: `=CONCATENATE('Member Info + Budget'!C9,"_",'Member Info + Budget'!B10, "_",'Member Info + Budget'!C10)`
          },
          userEnteredFormat: {
            textFormat: { fontSize: 10, fontFamily: 'Montserrat' },
          }
        },
      ]
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        }
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'INSTALLATION LOCATION' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'ITEM' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'MFG' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'STYLE/DESRIPTION' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'FINISH' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'SIZE' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'INSTALLATION NOTES:' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
      ],
    },
  ],
})

export const generateFinishSchedule = ({
  designer = '',
  isLaborUnion = false,
  deliveryType = ''
}) => ({
  columnMetadata: [
    { pixelSize: 250 },
    { pixelSize: 100 },
    { pixelSize: 230 },
    { pixelSize: 100 },
    { pixelSize: 100 },
    { pixelSize: 100 },
    { pixelSize: 100 },
    { pixelSize: 100 },
    { pixelSize: 100 },
    { pixelSize: 195 },
    { pixelSize: 100 },
    { pixelSize: 182 },
  ],
  rowData: [
    {
      values: [
        {
          userEnteredValue: { stringValue: 'FINISH SCHEDULE' },
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 18, fontFamily: 'Montserrat' },
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        }
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'DESIGNER' },
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 10, fontFamily: 'Montserrat' },
            backgroundColor: LIGHT_GRAY
          }
        },
        {},
        {
          userEnteredValue: { stringValue: designer },
          userEnteredFormat: {
            textFormat: { fontSize: 10, fontFamily: 'Montserrat' },
          }
        },
      ]
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'PROJECT' },
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 10, fontFamily: 'Montserrat' },
            backgroundColor: LIGHT_GRAY
          }
        },
        {},
        {
          userEnteredValue: { formulaValue: "='Member Info + Budget'!C3" },
          userEnteredFormat: {
            textFormat: { fontSize: 10, fontFamily: 'Montserrat' },
          }
        },
      ]
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'LOCATION' },
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 10, fontFamily: 'Montserrat' },
            backgroundColor: LIGHT_GRAY
          }
        },
        {},
        {
          userEnteredValue: {
            formulaValue: `=CONCATENATE('Member Info + Budget'!C9,"_",'Member Info + Budget'!B10, "_",'Member Info + Budget'!C10)`
          },
          userEnteredFormat: {
            textFormat: { fontSize: 10, fontFamily: 'Montserrat' },
          }
        },
      ]
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'LABOR' },
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 10, fontFamily: 'Montserrat' },
            backgroundColor: LIGHT_GRAY
          }
        },
        {},
        {
          userEnteredValue: { stringValue: isLaborUnion ? 'UNION' : 'NON-UNION' },
          userEnteredFormat: {
            textFormat: { fontSize: 10, fontFamily: 'Montserrat' },
          }
        },
      ]
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'DELIVERY' },
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 10, fontFamily: 'Montserrat' },
            backgroundColor: LIGHT_GRAY
          }
        },
        {},
        {
          userEnteredValue: { stringValue: deliveryType },
          userEnteredFormat: {
            textFormat: { fontSize: 10, fontFamily: 'Montserrat' },
          }
        },
      ]
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'SPECS:' },
          userEnteredFormat: {
            textFormat: { bold: true, fontSize: 10, fontFamily: 'Montserrat' },
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: '' },
          userEnteredFormat: {
            backgroundColor: DARK_GRAY,
          },
        }
      ],
    },
    {
      values: [
        {
          userEnteredValue: { stringValue: 'IMAGE' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'FINISH TAG' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'INSTALLATION LOCATION' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'MFG' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'COLLECTION' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'STYLE' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'COLOR/ FINISH' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'PRODUCT SIZE' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'AREA SIZE' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'INSTALLATION TYPE' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'TRANSITION' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
        {
          userEnteredValue: { stringValue: 'INSTALLATION NOTES:' },
          userEnteredFormat: {
            textFormat: { bold: true, fontFamily: 'Montserrat' },
            horizontalAlignment: 'CENTER',
            backgroundColor: LIGHT_GRAY,
          },
        },
      ],
    },
  ],
})
