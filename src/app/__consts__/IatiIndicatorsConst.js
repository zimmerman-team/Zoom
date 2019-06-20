export default [
  {
    label: 'activity status',
    value: 'activity_status',
    dataSource: 'IATI',
    subIndicators: {
      edges: [
        {
          node: { code: '1', name: 'Pipeline/identification' }
        },
        {
          node: { code: '2', name: 'Implementation' }
        },
        {
          node: { code: '3', name: 'Completion' }
        },
        {
          node: { code: '4', name: 'Post-completion' }
        },
        {
          node: { code: '5', name: 'Cancelled' }
        },
        {
          node: { code: '6', name: 'Suspended' }
        }
      ]
    }
  },
  {
    label: 'sector',
    value: 'sector',
    dataSource: 'IATI',
    firstYear: ''
  },
  {
    label: 'transactions',
    value: 'transactions',
    dataSource: 'IATI',
    subIndicators: {
      edges: [
        {
          node: { code: '1', name: 'Incoming Funds' }
        },
        {
          node: { code: '2', name: 'Outgoing Commitment' }
        },
        {
          node: { code: '3', name: 'Disbursement' }
        },
        {
          node: { code: '4', name: 'Expenditure' }
        },
        {
          node: { code: '5', name: 'Interest Payment' }
        },
        {
          node: { code: '6', name: 'Loan Repayment' }
        },
        {
          node: { code: '7', name: 'Reimbursement' }
        },
        {
          node: { code: '8', name: 'Purchase of Equity' }
        },
        {
          node: { code: '9', name: 'Sale of Equity' }
        },
        {
          node: { code: '10', name: 'Credit Guarantee' }
        },
        {
          node: { code: '11', name: 'Incoming Commitment' }
        },
        {
          node: { code: '12', name: 'Outgoing Pledge' }
        },
        {
          node: { code: '13', name: 'Incoming Pledge' }
        }
      ]
    }
  }
];
