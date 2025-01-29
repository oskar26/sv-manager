import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudentStore } from '../store/studentStore';
import { StudentDetails as StudentDetailsComponent } from '../components/student/StudentDetails';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function StudentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const student = useStudentStore((state) => state.getStudent(id!));

  if (!student) {
    return (
      <div className="text-center py-12">
        <p className="text-primary/60">Student not found</p>
        <Button variant="secondary" className="mt-4" onClick={() => navigate('/students')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Students
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button variant="secondary" onClick={() => navigate('/students')}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Students
      </Button>
      
      <StudentDetailsComponent student={student} />
    </div>
  );
}