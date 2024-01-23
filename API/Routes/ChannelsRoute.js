import User from '../models/Users.js';
import CreateChannelController from '../controller/CreateChannel_controller.js';
//Contollers
import CheckAvailibilityController from '../controller/CheckAvailibility_contoller.js';
import DeleteChannelController from '../controller/DeleteChannel_controller.js';
import FetchChannelsDynamicController from '../controller/FetchChannelsDynamic_controller.js';
import ChannelsInteractionController from '../controller/ChannelsInteraction_controller.js';
import channelMembersSearchController from '../controller/channelMembersSearch_controller.js';
import handleChannelReportController from '../controller/handleChannelReport_controller.js';
import handleChannelJoinController from '../controller/handleChannelJoin_controller.js';
import express from 'express';
import verifyMiddleware from '../middleware/VerifyMiddleware.js';
const Router = express.Router();

Router.get(`/check_availibility/:name`, CheckAvailibilityController);
Router.post(`/delete_channel`, verifyMiddleware, DeleteChannelController);
Router.post(`/create_channel`, CreateChannelController);
Router.post(`/fetch_dynamic_channels`, FetchChannelsDynamicController);
Router.post(`/channelInteract`, ChannelsInteractionController);
Router.post(`/channel_report`, handleChannelReportController);
Router.post(`/channel_join`, handleChannelJoinController);
Router.get(`/channelMembersSearch/:search_param/:channel_id`, channelMembersSearchController);
export default Router;
