require('dotenv').config();
const router = require('express').Router();
const DB_notification = require('../../DB-codes/notifications/DB-notification-api');
const {verify} = require('../../middlewares/user-verification');

router.get('/all', verify ,async (req,res)=>{
    result = await DB_notification.getAllNotifications(req.user.user_id);
    res.send(result);
});

router.get('/unread', verify ,async (req,res)=>{
    result = await DB_notification.getUnreadNotifications(req.user.user_id);
    res.send(result);
});

router.get('/count', verify ,async (req,res)=>{
    result = await DB_notification.getUnreadNotificationsCount(req.user.user_id);
    res.send(result);
});

router.put('/mark_read', verify ,async (req,res)=>{
    await DB_notification.markRead(req.user.user_id);
    res.send({"status" : "Marked as read"});
});

module.exports = router;