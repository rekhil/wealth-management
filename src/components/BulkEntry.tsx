import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface WealthEntry {
  date: Date | null;
  category: string;
  subCategory: string;
  amount: number;
  personId: string;
}

interface Person {
  id: string;
  name: string;
}

const samplePersons: Person[] = [
  { id: '1', name: 'Rekhil' },
  { id: '2', name: 'Amritha' },
];

const categories = [
  'Equity',
  'Debt',
  'Fixed Deposit',
  'Gold',
  'Real Estate',
  'Savings',
  'Retirement',
];

const subCategories: { [key: string]: string[] } = {
  'Equity': ['Upstox', 'ET Money', 'ICICI Pro Life Insurance', 'Fidelity'],
  'Debt': ['ET Money', 'LIC'],
  'Fixed Deposit': ['ICICI', 'Apple - Saving'],
  'Gold': ['Physical', 'SGB'],
  'Real Estate': ['Property', 'REIT'],
  'Savings': ['ICICI', 'BOFA'],
  'Retirement': ['401K'],
};

const BulkEntry: React.FC = () => {
  const [entries] = useState<WealthEntry[]>([]);
  const [entry, setEntry] = useState<WealthEntry>({
    date: new Date(),
    personId: samplePersons[0].id,
    category: categories[0],
    subCategory: subCategories[categories[0]][0],
    amount: 0,
  });

  const handleAmountChange = (category: string, subCategory: string, value: string) => {
    setEntry(prev => ({
      ...prev,
      category,
      subCategory,
      amount: parseFloat(value) || 0,
    }));
  };

  const calculateCategoryTotal = (category: string) => {
    return entries
      .filter(e => e.category === category)
      .reduce((sum, entry) => sum + entry.amount, 0);
  };

  const calculateGrandTotal = () => {
    return entries.reduce((sum, entry) => sum + entry.amount, 0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Bulk Wealth Entry
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={entry.date}
                onChange={(newValue) => setEntry(prev => ({ ...prev, date: newValue }))}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Select Person</InputLabel>
              <Select
                value={entry.personId}
                label="Select Person"
                onChange={(e) => setEntry(prev => ({ ...prev, personId: e.target.value }))}
              >
                {samplePersons.map((person) => (
                  <MenuItem key={person.id} value={person.id}>
                    {person.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Subcategory</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <React.Fragment key={category}>
                  {subCategories[category].map((subCategory, index) => (
                    <TableRow key={`${category}-${subCategory}`}>
                      {index === 0 && (
                        <TableCell rowSpan={subCategories[category].length}>
                          {category}
                        </TableCell>
                      )}
                      <TableCell>{subCategory}</TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          value={entry.amount}
                          onChange={(e) => handleAmountChange(category, subCategory, e.target.value)}
                          size="small"
                          InputProps={{
                            startAdornment: '$',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2} align="right">
                      <strong>Total {category}:</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>${calculateCategoryTotal(category).toLocaleString()}</strong>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <strong>Grand Total:</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>${calculateGrandTotal().toLocaleString()}</strong>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary">
            Save Entries
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BulkEntry; 