import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { useStudentStore } from '../store/studentStore';
import { format } from 'date-fns';
import { FileDown } from 'lucide-react';
import { Student } from '../types';

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
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    minHeight: 30,
  },
  cell: {
    flex: 1,
    padding: 5,
    fontSize: 12,
  },
  date: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'right',
    color: '#666',
  },
  noStudents: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#666',
  },
});

const BanReportDocument = ({ bannedStudents }: { bannedStudents: Student[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Current Room Bans Report</Text>
      <Text style={styles.date}>
        Generated on: {format(new Date(), 'MMMM dd, yyyy')}
      </Text>
      <View style={styles.section}>
        <Text style={styles.header}>Currently Banned Students</Text>
        {bannedStudents.length === 0 ? (
          <Text style={styles.noStudents}>No students are currently banned.</Text>
        ) : (
          bannedStudents.map((student) => (
            <View key={student.id} style={styles.row}>
              <Text style={styles.cell}>{student.name}</Text>
              <Text style={styles.cell}>{student.class}</Text>
              <Text style={styles.cell}>
                Until: {format(new Date(student.currentBan!.endDate), 'MMM dd, yyyy')}
              </Text>
              <Text style={styles.cell}>
                Reason: {student.currentBan!.reason}
              </Text>
            </View>
          ))
        )}
      </View>
    </Page>
  </Document>
);

export function BanReport() {
  const bannedStudents = useStudentStore((state) => 
    state.students.filter((s) => s.currentBan && new Date(s.currentBan.endDate) > new Date())
  );

  return (
    <PDFDownloadLink
      document={<BanReportDocument bannedStudents={bannedStudents} />}
      fileName={`room-bans-${format(new Date(), 'yyyy-MM-dd')}.pdf`}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
    >
      {({ loading }) =>
        loading ? (
          'Generating PDF...'
        ) : (
          <>
            <FileDown className="h-4 w-4 mr-2" />
            Download Ban Report
          </>
        )
      }
    </PDFDownloadLink>
  );
}