const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
show(req, res, next){
    //[GET] /course/:slug
    Course.findOne({ slug: req.params.slug })
        .then(course =>
            res.render('courses/show', {course: mongooseToObject(course)})
        )
        .catch(next);
}

create(req, res, next){
    //[GET] /course/create
   res.render('courses/create');
}

 //[POST] /course/store
store(req, res, next){

    // res.json(req.body);
        const course = new Course(req.body);
        course.save()
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next);
}
//[GET] /courses/:id/edit
    edit(req, res, next){
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }) )
                .catch(next);
    }

    //[PUT] /courses/:id
    update(req, res, next){
        Course.updateOne({ _id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
     //[Delete] courses/:id
    delete(req, res, next){
        Course.delete({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[Delete] courses/:id/force
    forceDelete(req, res, next){
        Course.deleteOne({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PATCH] course/:id/restore
    restore( req, res, next) {
        Course.restore({ _id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }

    //[POST] /course/handle-form-actions
    handleFormActions(req, res, next){
        switch(req.body.action){
            case 'delete':
                Course.delete({ _id: {$in: req.body.courseIds} })
                .then(() => res.redirect('back'))
                .catch(next);
                    break;
                default:
                    res.json({ message: 'Action is invalid!' });
        }
    }
}
module.exports = new CourseController();
