import assert from 'node:assert/strict';
import { classifyFinancialActivity } from '@x12i/financial-classifier';
const accountKey = { entityId: 'demo', ledgerId: 'general', chartId: 'demo-chart', accountId: 'cash' };
const period = { start: '2026-01-01', endExclusive: '2027-01-01' };
const result = classifyFinancialActivity({ schemaVersion: '1.0', period, basis: 'source_as_reported', currency: 'USD',
  rows: [{ accountKey, label: 'Demo expense', bookCurrency: 'USD', netActivity: '20.00', adjustedClosing: '20.00' }],
  rules: [{ ruleId: 'explicit-demo', priority: 10, dimension: 'expense_function', accountIds: ['cash'], category: 'administration', allocationRatio: '1', effectiveFrom: period.start, reason: 'Synthetic mapping for the example', reviewState: 'approved' }],
});
assert(result.data.assignments.some(item => item.category === 'expense_function:administration' && Number(item.amount) === 20));
console.log(result.data.assignments);
