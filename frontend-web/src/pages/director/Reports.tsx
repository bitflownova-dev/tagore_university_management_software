import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Print as PrintIcon,
  PictureAsPdf as PdfIcon,
} from '@mui/icons-material';

export default function Reports() {
  const [reportType, setReportType] = useState('attendance');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const reportTypes = [
    { value: 'attendance', label: 'Attendance Report' },
    { value: 'academic', label: 'Academic Performance Report' },
    { value: 'financial', label: 'Financial Report' },
    { value: 'enrollment', label: 'Enrollment Report' },
    { value: 'staff', label: 'Staff Report' },
    { value: 'department', label: 'Department Report' },
  ];

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Reports & Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Report Generator */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Generate Report
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                select
                label="Report Type"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                fullWidth
              >
                {reportTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <Button variant="contained" startIcon={<DownloadIcon />} fullWidth>
                Generate Report
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Reports */}
        <Grid item xs={12} lg={8}>
          <Typography variant="h6" gutterBottom>
            Quick Reports
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Daily Attendance Report
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Today's attendance summary for all departments
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<PdfIcon />}>
                      PDF
                    </Button>
                    <Button size="small" startIcon={<PrintIcon />}>
                      Print
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Academic Report
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Academic performance for current month
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<PdfIcon />}>
                      PDF
                    </Button>
                    <Button size="small" startIcon={<PrintIcon />}>
                      Print
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Fee Collection Report
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Monthly fee collection summary
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<PdfIcon />}>
                      PDF
                    </Button>
                    <Button size="small" startIcon={<PrintIcon />}>
                      Print
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Staff Performance Report
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Staff attendance and performance metrics
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="small" startIcon={<PdfIcon />}>
                      PDF
                    </Button>
                    <Button size="small" startIcon={<PrintIcon />}>
                      Print
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
