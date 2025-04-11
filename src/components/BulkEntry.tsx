import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

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
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
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
  const [entries, setEntries] = useState<WealthEntry[]>([]);
  const [entry, setEntry] = useState<WealthEntry>({
    date: new Date(),
    personId: samplePersons[0].id,
    category: categories[0],
    subCategory: subCategories[categories[0]][0],
    amount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save functionality
    console.log('Bulk entry submitted:', entry);
  };

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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Bulk Wealth Entry
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="person-select-label">Select Person</InputLabel>
                <Select
                  labelId="person-select-label"
                  value={entry.personId}
                  label="Select Person"
                  onChange={(e) => setEntry({ ...entry, personId: e.target.value })}
                >
                  {samplePersons.map((person) => (
                    <MenuItem key={person.id} value={person.id}>
                      {person.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date"
                value={entry.date}
                onChange={(newValue) => setEntry({ ...entry, date: newValue })}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TableContainer component={Paper} variant="outlined">
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
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Save Bulk Entry
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default BulkEntry; 