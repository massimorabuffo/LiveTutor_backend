import Joi from "joi";
export const toDoCreateScheme = Joi.object({
    title: Joi.string().required(),
    completed: Joi.string().max(4).required()
});
