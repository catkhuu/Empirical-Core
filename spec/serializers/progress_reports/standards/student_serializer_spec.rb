require 'rails_helper'

describe ProgressReports::Standards::StudentSerializer, type: :serializer do
  let(:teacher) { FactoryGirl.create(:teacher) }
  let!(:student) { FactoryGirl.create(:student, teacher: teacher)}
  let!(:classroom) { FactoryGirl.create(:classroom, teacher: teacher) }
  let(:activity) { FactoryGirl.create(:activity) }
  let(:classroom_activity) { FactoryGirl.create(:classroom_activity, classroom: classroom, activity: activity) }
  let(:student_for_report) { User.for_standards_report(teacher, {}).first }
  let(:serializer) do
    serializer = described_class.new(student_for_report)
    serializer.classroom_id = 123
    serializer
  end

  before do
    student.activity_sessions.create!(
      classroom_activity: classroom_activity,
      percentage: 1,
      state: 'finished',
      completed_at: 5.minutes.ago
    )
  end

  describe '#to_json output' do
    let(:json)   { serializer.to_json }
    let(:parsed) { JSON.parse(json) }
    let(:parsed_classroom) { parsed['student'] }

    it 'includes the right keys' do
      expect(parsed_classroom.keys)
        .to match_array %w(name
                           total_standard_count
                           proficient_standard_count
                           near_proficient_standard_count
                           not_proficient_standard_count
                           total_activity_count
                           average_score
                           student_topics_href
                          )
    end
  end
end
