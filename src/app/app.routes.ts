import { Routes } from '@angular/router';
import { GetAllCourses } from './components/course/get-all-courses/get-all-courses';
import { CreateCourses } from './components/course/create-courses/create-courses';
import { UpdateCourses } from './components/course/update-courses/update-courses';
import { GetAllCourseTags } from './components/courseTag/get-all-course-tags/get-all-course-tags';
import { CreateCourseTags } from './components/courseTag/create-course-tags/create-course-tags';
import { UpdateCourseTags } from './components/courseTag/update-course-tags/update-course-tags';
import { GetAllTags } from './components/tag/get-all-tags/get-all-tags';
import { CreateTags } from './components/tag/create-tags/create-tags';
import { UpdateTags } from './components/tag/update-tags/update-tags';
import { GetAllPosts } from './components/post/get-all-posts/get-all-posts';
import { CreatePosts } from './components/post/create-posts/create-posts';
import { UpdatePosts } from './components/post/update-posts/update-posts';
import { GetAllForums } from './components/forum/get-all-forums/get-all-forums';
import { CreateForums } from './components/forum/create-forums/create-forums';
import { UpdateForums } from './components/forum/update-forums/update-forums';
import { GetAllAttempts } from './components/attempt/get-all-attempts/get-all-attempts';
import { CreateAttempts } from './components/attempt/create-attempts/create-attempts';
import { UpdateAttempts } from './components/attempt/update-attempts/update-attempts';
import { GetAllSubmissions } from './components/submission/get-all-submissions/get-all-submissions';
import { CreateSubmissions } from './components/submission/create-submissions/create-submissions';
import { UpdateSubmissions } from './components/submission/update-submissions/update-submissions';
import { GetAllEnrollments } from './components/enrollment/get-all-enrollments/get-all-enrollments';
import { CreateEnrollments } from './components/enrollment/create-enrollments/create-enrollments';
import { UpdateEnrollments } from './components/enrollment/update-enrollments/update-enrollments';
import { GetAllStudents } from './components/student/get-all-students/get-all-students';
import { CreateStudents } from './components/student/create-students/create-students';
import { UpdateStudents } from './components/student/update-students/update-students';
import { GetAllTeachers } from './components/teacher/get-all-teachers/get-all-teachers';
import { CreateTeachers } from './components/teacher/create-teachers/create-teachers';
import { UpdateTeachers } from './components/teacher/update-teachers/update-teachers';
import { GetAllModules } from './components/module/get-all-modules/get-all-modules';
import { CreateModules } from './components/module/create-modules/create-modules';
import { UpdateModules } from './components/module/update-modules/update-modules';
import { GetAllLessons } from './components/lesson/get-all-lessons/get-all-lessons';
import { CreateLessons } from './components/lesson/create-lessons/create-lessons';
import { UpdateLessons } from './components/lesson/update-lessons/update-lessons';
import { GetAllAssessments } from './components/assessment/get-all-assessments/get-all-assessments';
import { CreateAssessments } from './components/assessment/create-assessments/create-assessments';
import { UpdateAssessments } from './components/assessment/update-assessments/update-assessments';



export const routes: Routes = [

    {
        path: 'courses',
        component: GetAllCourses
    },
    {
        path: 'courses/new',
        component: CreateCourses
    },
    {
        path: 'courses/edit/:id',
        component: UpdateCourses
    },

    {
        path: 'modules',
        component: GetAllModules
    },
    {
        path: 'modules/new',
        component: CreateModules
    },
    {
        path: 'modules/edit/:id',
        component: UpdateModules
    },

    {
        path: 'lessons',
        component: GetAllLessons
    },
    {
        path: 'lessons/new',
        component: CreateLessons
    },
    {
        path: 'lessons/edit/:id',
        component: UpdateLessons
    },

    {
        path: 'teachers',
        component: GetAllTeachers
    },
    {
        path: 'teachers/new',
        component: CreateTeachers
    },
    {
        path: 'teachers/edit/:id',
        component: UpdateTeachers
    },

    {
        path: 'students',
        component: GetAllStudents
    },
    {
        path: 'students/new',  
        component: CreateStudents
    },
    {
        path: 'students/edit/:id',
        component: UpdateStudents
    },

    {
        path: 'enrollments',
        component: GetAllEnrollments
    },
    {
        path: 'enrollments/new',
        component: CreateEnrollments
    },
    {
        path: 'enrollments/edit/:id',
        component: UpdateEnrollments
    },

    {
        path: 'submissions',
        component: GetAllSubmissions
    },
    {
        path: 'submissions/new',
        component: CreateSubmissions
    },
    {
        path: 'submissions/edit/:id',
        component: UpdateSubmissions
    },

    {
        path: 'attempts',
        component: GetAllAttempts
    },
    {
        path: 'attempts/new',
        component: CreateAttempts
    },
    {
        path: 'attempts/edit/:id',
        component: UpdateAttempts
    },

    {
        path: 'assessments',
        component: GetAllAssessments
    },
    {
        path: 'assessments/new',
        component: CreateAssessments
    },
    {
        path: 'assessments/edit/:id',
        component: UpdateAssessments
    },

    {
        path: 'forums',
        component: GetAllForums
    },
    {
        path: 'forums/new',
        component: CreateForums
    },
    {
        path: 'forums/edit/:id',
        component: UpdateForums
    },

    {
        path: 'posts',
        component: GetAllPosts
    },
    {
        path: 'posts/new',
        component: CreatePosts
    },
    {
        path: 'posts/edit/:id',
        component: UpdatePosts
    },

    {
        path: 'tags',
        component: GetAllTags
    },
    {
        path: 'tags/new',
        component: CreateTags
    },
    {
        path: 'tags/edit/:id',
        component: UpdateTags
    },

    {
        path: 'coursetags',
        component: GetAllCourseTags
    },
    {
        path: 'coursetags/new',
        component: CreateCourseTags
    },
    {
        path: 'coursetags/edit/:id',
        component: UpdateCourseTags
    }
];
