import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface WealthEntry {
  date: Date | null;
  mainCategory: string;
  subCategory: string;
  amount: number;
  description: string;
  personId: string;
}

interface Person {
  id: string;
  name: string;
}

interface Category {
  main: string;
  sub: string[];
}

const categories: Category[] = [
  {
    main: 'Equity',
    sub: [
      'Upstox',
      'ET Money',
      'ICICI Pro Life Insurance',
      'Fidelity'
    ]
  },
  {
    main: 'Debt',
    sub: [
      'ET Money',
      'LIC'
    ]
  },
  {
    main: 'Fixed Deposit',
    sub: [
      'ICICI',
      'Apple - Saving'
    ]
  },
  {
    main: 'Gold',
    sub: [
      'Physical',
      'SGB'
    ]
  },
  {
    main: 'Real Estate',
    sub: [
      'Property',
      'REIT'
    ]
  },
  {
    main: 'Savings',
    sub: [
      'ICICI',
      'BOFA'
    ]
  },
  {
    main: 'Retirement',
    sub: [
      '401K'
    ]
  }
];

const samplePersons: Person[] = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' },
];

const WealthEntry: React.FC = () => {
  const [entry, setEntry] = useState<WealthEntry>({
    date: new Date(),
    mainCategory: '',
    subCategory: '',
    amount: 0,
    description: '',
    personId: samplePersons[0].id,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save functionality
    console.log('Entry submitted:', entry);
  };

  const handleMainCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const newMainCategory = e.target.value as string;
    setEntry({
      ...entry,
      mainCategory: newMainCategory,
      subCategory: '', // Reset subcategory when main category changes
    });
  };

  const getSubCategories = () => {
    const category = categories.find(cat => cat.main === entry.mainCategory);
    return category ? category.sub : [];
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add Wealth Entry
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
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Main Category"
                value={entry.mainCategory}
                onChange={handleMainCategoryChange}
                fullWidth
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category.main} value={category.main}>
                    {category.main}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Sub Category"
                value={entry.subCategory}
                onChange={(e) => setEntry({ ...entry, subCategory: e.target.value })}
                fullWidth
                required
                disabled={!entry.mainCategory}
              >
                {getSubCategories().map((subCategory) => (
                  <MenuItem key={subCategory} value={subCategory}>
                    {subCategory}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount"
                type="number"
                value={entry.amount}
                onChange={(e) =>
                  setEntry({ ...entry, amount: parseFloat(e.target.value) })
                }
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={entry.description}
                onChange={(e) =>
                  setEntry({ ...entry, description: e.target.value })
                }
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save Entry
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default WealthEntry; 