import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface WealthData {
  date: string;
  amount: number;
  category: string;
  subCategory: string;
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

const sampleData: WealthData[] = [
  // January 2024
  { date: '2024-01-01', amount: 5000000, category: 'Equity', subCategory: 'Upstox', personId: '1' },
  { date: '2024-01-01', amount: 3300000, category: 'Equity', subCategory: 'ET Money', personId: '1' },
  { date: '2024-01-01', amount: 1700000, category: 'Equity', subCategory: 'ICICI Pro Life Insurance', personId: '1' },
  { date: '2024-01-01', amount: 3500000, category: 'Equity', subCategory: 'Fidelity', personId: '1' },
  { date: '2024-01-01', amount: 40000, category: 'Debt', subCategory: 'ET Money', personId: '1' },
  { date: '2024-01-01', amount: 340000, category: 'Debt', subCategory: 'LIC', personId: '1' },
  { date: '2024-01-01', amount: 500000, category: 'Fixed Deposit', subCategory: 'ICICI', personId: '1' },
  { date: '2024-01-01', amount: 0, category: 'Fixed Deposit', subCategory: 'Apple - Saving', personId: '1' },
  { date: '2024-01-01', amount: 0, category: 'Gold', subCategory: 'Physical', personId: '1' },
  { date: '2024-01-01', amount: 0, category: 'Gold', subCategory: 'SGB', personId: '1' },
  { date: '2024-01-01', amount: 0, category: 'Real Estate', subCategory: 'Property', personId: '1' },
  { date: '2024-01-01', amount: 50000, category: 'Real Estate', subCategory: 'REIT', personId: '1' },
  { date: '2024-01-01', amount: 0, category: 'Savings', subCategory: 'ICICI', personId: '1' },
  { date: '2024-01-01', amount: 0, category: 'Savings', subCategory: 'BOFA', personId: '1' },
  { date: '2024-01-01', amount: 450000, category: 'Retirement', subCategory: '401K', personId: '1' },

  // February 2024
  { date: '2024-02-01', amount: 5100000, category: 'Equity', subCategory: 'Upstox', personId: '1' },
  { date: '2024-02-01', amount: 3400000, category: 'Equity', subCategory: 'ET Money', personId: '1' },
  { date: '2024-02-01', amount: 1750000, category: 'Equity', subCategory: 'ICICI Pro Life Insurance', personId: '1' },
  { date: '2024-02-01', amount: 3600000, category: 'Equity', subCategory: 'Fidelity', personId: '1' },
  { date: '2024-02-01', amount: 40200, category: 'Debt', subCategory: 'ET Money', personId: '1' },
  { date: '2024-02-01', amount: 345000, category: 'Debt', subCategory: 'LIC', personId: '1' },
  { date: '2024-02-01', amount: 520000, category: 'Fixed Deposit', subCategory: 'ICICI', personId: '1' },
  { date: '2024-02-01', amount: 0, category: 'Fixed Deposit', subCategory: 'Apple - Saving', personId: '1' },
  { date: '2024-02-01', amount: 0, category: 'Gold', subCategory: 'Physical', personId: '1' },
  { date: '2024-02-01', amount: 0, category: 'Gold', subCategory: 'SGB', personId: '1' },
  { date: '2024-02-01', amount: 0, category: 'Real Estate', subCategory: 'Property', personId: '1' },
  { date: '2024-02-01', amount: 52500, category: 'Real Estate', subCategory: 'REIT', personId: '1' },
  { date: '2024-02-01', amount: 0, category: 'Savings', subCategory: 'ICICI', personId: '1' },
  { date: '2024-02-01', amount: 0, category: 'Savings', subCategory: 'BOFA', personId: '1' },
  { date: '2024-02-01', amount: 456000, category: 'Retirement', subCategory: '401K', personId: '1' },

  // March 2024
  { date: '2024-03-01', amount: 5223523, category: 'Equity', subCategory: 'Upstox', personId: '1' },
  { date: '2024-03-01', amount: 3467663, category: 'Equity', subCategory: 'ET Money', personId: '1' },
  { date: '2024-03-01', amount: 1792518, category: 'Equity', subCategory: 'ICICI Pro Life Insurance', personId: '1' },
  { date: '2024-03-01', amount: 3689202, category: 'Equity', subCategory: 'Fidelity', personId: '1' },
  { date: '2024-03-01', amount: 40305, category: 'Debt', subCategory: 'ET Money', personId: '1' },
  { date: '2024-03-01', amount: 350000, category: 'Debt', subCategory: 'LIC', personId: '1' },
  { date: '2024-03-01', amount: 545026, category: 'Fixed Deposit', subCategory: 'ICICI', personId: '1' },
  { date: '2024-03-01', amount: 0, category: 'Fixed Deposit', subCategory: 'Apple - Saving', personId: '1' },
  { date: '2024-03-01', amount: 0, category: 'Gold', subCategory: 'Physical', personId: '1' },
  { date: '2024-03-01', amount: 0, category: 'Gold', subCategory: 'SGB', personId: '1' },
  { date: '2024-03-01', amount: 0, category: 'Real Estate', subCategory: 'Property', personId: '1' },
  { date: '2024-03-01', amount: 55224, category: 'Real Estate', subCategory: 'REIT', personId: '1' },
  { date: '2024-03-01', amount: 0, category: 'Savings', subCategory: 'ICICI', personId: '1' },
  { date: '2024-03-01', amount: 0, category: 'Savings', subCategory: 'BOFA', personId: '1' },
  { date: '2024-03-01', amount: 463156, category: 'Retirement', subCategory: '401K', personId: '1' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const timePeriods = [
  { label: '1 Month', value: 1 },
  { label: '3 Months', value: 3 },
  { label: '6 Months', value: 6 },
  { label: '1 Year', value: 12 },
  { label: '3 Years', value: 36 },
  { label: '5 Years', value: 60 },
];

// Format number to K or M format with decimal places
const formatNumber = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toFixed(0);
};

// Custom tooltip formatter with improved styling
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Paper 
        sx={{ 
          p: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
          {label}
        </Typography>
        {payload.map((entry: any, index: number) => (
          <Typography 
            key={index} 
            variant="body2" 
            sx={{ 
              color: entry.color,
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <span>{entry.name}:</span>
            <span>${formatNumber(entry.value)}</span>
          </Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

// Custom Y-axis tick formatter
const CustomYAxisTick = ({ x, y, payload }: any) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        style={{ fontSize: '12px' }}
      >
        ${formatNumber(payload.value)}
      </text>
    </g>
  );
};

const Dashboard: React.FC = () => {
  const [selectedPerson, setSelectedPerson] = useState<string>(samplePersons[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<number>(12);

  const filteredData = sampleData.filter((entry) => entry.personId === selectedPerson);

  const mainCategoryData = filteredData.reduce((acc: { [key: string]: number }, entry) => {
    if (!acc[entry.category]) {
      acc[entry.category] = 0;
    }
    acc[entry.category] += entry.amount;
    return acc;
  }, {});

  const chartData = Object.entries(mainCategoryData).map(([category, amount]) => ({
    category,
    amount,
  }));

  // Group data by date for the line chart
  const netWorthData = Object.entries(
    filteredData.reduce((acc: { [key: string]: number }, entry) => {
      if (!acc[entry.date]) {
        acc[entry.date] = 0;
      }
      acc[entry.date] += entry.amount;
      return acc;
    }, {})
  ).map(([date, amount]) => ({
    date,
    amount,
  }));

  // Sort by date
  netWorthData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Filter data based on selected time period
  const filteredNetWorthData = netWorthData.filter((entry) => {
    const entryDate = new Date(entry.date);
    const currentDate = new Date();
    const monthsDiff = (currentDate.getFullYear() - entryDate.getFullYear()) * 12 + 
                      (currentDate.getMonth() - entryDate.getMonth());
    return monthsDiff <= selectedTimePeriod;
  });

  // Prepare data for pie chart
  const pieChartData = Object.entries(mainCategoryData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  // Prepare data for subcategory pie chart
  const subCategoryData = filteredData
    .filter(entry => !selectedCategory || entry.category === selectedCategory)
    .reduce((acc: { [key: string]: number }, entry) => {
      if (!acc[entry.subCategory]) {
        acc[entry.subCategory] = 0;
      }
      acc[entry.subCategory] += entry.amount;
      return acc;
    }, {});

  const subCategoryPieData = Object.entries(subCategoryData).map(([subCategory, amount]) => ({
    name: subCategory,
    value: amount,
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Dashboard
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="person-select-label">Select Person</InputLabel>
                  <Select
                    labelId="person-select-label"
                    value={selectedPerson}
                    label="Select Person"
                    onChange={(e) => setSelectedPerson(e.target.value)}
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
                <FormControl fullWidth>
                  <InputLabel id="time-period-label">Time Period</InputLabel>
                  <Select
                    labelId="time-period-label"
                    value={selectedTimePeriod}
                    label="Time Period"
                    onChange={(e) => setSelectedTimePeriod(e.target.value as number)}
                  >
                    {timePeriods.map((period) => (
                      <MenuItem key={period.value} value={period.value}>
                        {period.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom>
              Net Worth Over Time
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredNetWorthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#666' }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                  />
                  <YAxis 
                    tick={<CustomYAxisTick />}
                    interval="preserveStartEnd"
                    domain={['auto', 'auto']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Net Worth"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Wealth Distribution by Category
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fill: '#666' }}
                  />
                  <YAxis 
                    tick={<CustomYAxisTick />}
                    interval="preserveStartEnd"
                    domain={['auto', 'auto']}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="amount" 
                    fill="#8884d8" 
                    name="Amount"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Category Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomTooltip />}
                    formatter={(value: number) => `$${formatNumber(value)}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Subcategory Distribution
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="category-select-label">Select Category</InputLabel>
              <Select
                labelId="category-select-label"
                value={selectedCategory}
                label="Select Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {Object.keys(mainCategoryData).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subCategoryPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subCategoryPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={<CustomTooltip />}
                    formatter={(value: number) => `$${formatNumber(value)}`}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 