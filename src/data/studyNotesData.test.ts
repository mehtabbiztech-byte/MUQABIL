import assert from 'node:assert/strict';
import test from 'node:test';
import { STUDY_CURRICULUM, STUDY_NOTES_DATA } from './studyNotesData';

test('study notes bank exposes complete, unique revision notes', () => {
  assert.ok(STUDY_NOTES_DATA.length > 0);
  assert.equal(new Set(STUDY_NOTES_DATA.map((note) => note.id)).size, STUDY_NOTES_DATA.length);
  for (const note of STUDY_NOTES_DATA) {
    assert.ok(note.title.length > 0, note.id);
    assert.ok(note.subject.length > 0, note.id);
    assert.ok(note.summary.length > 0, note.id);
    assert.ok(note.keyPoints.length > 0, note.id);
    assert.ok(note.frequentlyAsked.length > 0, note.id);
  }
});

test('study curriculum nests subjects, chapters, topics and lessons safely', () => {
  assert.ok(STUDY_CURRICULUM.length > 0);
  assert.equal(new Set(STUDY_CURRICULUM.map((subject) => subject.id)).size, STUDY_CURRICULUM.length);

  const lessonIds = STUDY_CURRICULUM.flatMap((subject) => {
    assert.ok(subject.title.length > 0, subject.id);
    assert.ok(subject.chapters.length > 0, subject.id);

    return subject.chapters.flatMap((chapter) => {
      assert.ok(chapter.title.length > 0, chapter.id);
      assert.ok(chapter.topics.length > 0, chapter.id);

      return chapter.topics.flatMap((topic) => {
        assert.ok(topic.title.length > 0, topic.id);
        assert.ok(topic.lessons.length > 0, topic.id);

        return topic.lessons.map((lesson) => {
          assert.ok(lesson.title.length > 0, lesson.id);
          assert.ok(lesson.explanation.length > 0, lesson.id);
          assert.ok(lesson.practice.length > 0, lesson.id);
          assert.ok(['kids', 'advanced'].includes(lesson.audience), lesson.id);
          return lesson.id;
        });
      });
    });
  });

  assert.equal(new Set(lessonIds).size, lessonIds.length);
});
