import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Student } from '../../types';
import { format } from 'date-fns';
import { FileDown } from 'lucide-react';
import { Button } from '../ui/Button';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  banEntry: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
  },
  banHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  banDetails: {
    fontSize: 10,
    color: '#666',
  },
  violation: {
    marginLeft: 10,
    marginTop: 5,
    fontSize: 10,
    color: '#666',
  },
});

const BanHistoryDocument = ({ student }: { student: Student }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Ban History Report</Text>
      <Text style={styles.subtitle}>
        Student: {student.name} | Class: {student.class}
      </Text>

      {student.banHistory.map((ban) => (
        <View key={ban.id} style={styles.banEntry}>
          <Text style={styles.banHeader}>{ban.reason}</Text>
          <Text style={styles.banDetails}>
            Duration: {format(ban.startDate, 'MMM dd, yyyy')} -{' '}
            {format(ban.endDate, 'MMM dd, yyyy')}
          </Text>
          
          {ban.violations.length > 0 && (
            <>
              <Text style={styles.banDetails}>
                Violations: {ban.violations.length}
              </Text>
              {ban.violations.map((violation) => (
                <Text key={violation.id} style={styles.violation}>
                  • {format(violation.date, 'MMM dd, yyyy')} - {violation.description}
                  {' (Extended by '}{violation.extensionDays}{' days)'}
                </Text>
              ))}
            </>
          )}
        </View>
      ))}
    </Page>
  </Document>
);

export function BanHistoryPDF({ student }: { student: Student }) {
  return (
    <PDFDownloadLink
      document={<BanHistoryDocument student={student} />}
      fileName={`${student.name.toLowerCase().replace(/\s+/g, '-')}-ban-history.pdf`}
    >
      {({ loading }) => (
        <Button variant="secondary" disabled={loading}>
          <FileDown className="h-4 w-4" />
          {loading ? 'Generating PDF...' : 'Download History'}
        </Button>
      )}
    </PDFDownloadLink>
  );
}