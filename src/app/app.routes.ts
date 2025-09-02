import { Routes } from '@angular/router';
import { GetAllCourses } from './components/academicManagment/course/get-all-courses/get-all-courses';
import { CreateCourses } from './components/academicManagment/course/create-courses/create-courses';
import { UpdateCourses } from './components/academicManagment/course/update-courses/update-courses';
import { GetAllModules } from './components/academicManagment/module/get-all-modules/get-all-modules';
import { CreateModules } from './components/academicManagment/module/create-modules/create-modules';
import { UpdateModules } from './components/academicManagment/module/update-modules/update-modules';
import { GetAllLessons } from './components/academicManagment/lesson/get-all-lessons/get-all-lessons';
import { CreateLessons } from './components/academicManagment/lesson/create-lessons/create-lessons';
import { UpdateLessons } from './components/academicManagment/lesson/update-lessons/update-lessons';
import { GetAllTeachers } from './components/usersAndEnrrollment/teacher/get-all-teachers/get-all-teachers';
import { CreateTeachers } from './components/usersAndEnrrollment/teacher/create-teachers/create-teachers';
import { UpdateTeachers } from './components/usersAndEnrrollment/teacher/update-teachers/update-teachers';
import { GetAllStudents } from './components/usersAndEnrrollment/student/get-all-students/get-all-students';
import { CreateStudents } from './components/usersAndEnrrollment/student/create-students/create-students';
import { UpdateStudents } from './components/usersAndEnrrollment/student/update-students/update-students';
import { GetAllEnrollments } from './components/usersAndEnrrollment/enrollment/get-all-enrollments/get-all-enrollments';
import { CreateEnrollments } from './components/usersAndEnrrollment/enrollment/create-enrollments/create-enrollments';
import { UpdateEnrollments } from './components/usersAndEnrrollment/enrollment/update-enrollments/update-enrollments';
import { GetAllSubmissions } from './components/academicActivities/submission/get-all-submissions/get-all-submissions';
import { CreateSubmissions } from './components/academicActivities/submission/create-submissions/create-submissions';
import { UpdateSubmissions } from './components/academicActivities/submission/update-submissions/update-submissions';
import { GetAllAttempts } from './components/academicActivities/attempt/get-all-attempts/get-all-attempts';
import { CreateAttempts } from './components/academicActivities/attempt/create-attempts/create-attempts';
import { UpdateAttempts } from './components/academicActivities/attempt/update-attempts/update-attempts';
import { GetAllAssessments } from './components/academicActivities/assessment/get-all-assessments/get-all-assessments';
import { CreateAssessments } from './components/academicActivities/assessment/create-assessments/create-assessments';
import { UpdateAssessments } from './components/academicActivities/assessment/update-assessments/update-assessments';
import { GetAllForums } from './components/forumsAndCommunity/forum/get-all-forums/get-all-forums';
import { CreateForums } from './components/forumsAndCommunity/forum/create-forums/create-forums';
import { UpdateForums } from './components/forumsAndCommunity/forum/update-forums/update-forums';
import { GetAllPosts } from './components/forumsAndCommunity/post/get-all-posts/get-all-posts';
import { CreatePosts } from './components/forumsAndCommunity/post/create-posts/create-posts';
import { UpdatePosts } from './components/forumsAndCommunity/post/update-posts/update-posts';
import { GetAllTags } from './components/forumsAndCommunity/tag/get-all-tags/get-all-tags';
import { CreateTags } from './components/forumsAndCommunity/tag/create-tags/create-tags';
import { UpdateTags } from './components/forumsAndCommunity/tag/update-tags/update-tags';
import { GetAllCourseTags } from './components/forumsAndCommunity/courseTag/get-all-course-tags/get-all-course-tags';
import { CreateCourseTags } from './components/forumsAndCommunity/courseTag/create-course-tags/create-course-tags';
import { UpdateCourseTags } from './components/forumsAndCommunity/courseTag/update-course-tags/update-course-tags';




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
