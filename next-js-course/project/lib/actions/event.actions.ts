'use server'

import Event from "@/database/event.model"
import connectDB from "../mongodb"

export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB()

        const event = await Event.findOne({ slug })

        // it will find events that have at least one tag in common with the current event, excluding the current event itself
        // $ne stands for "not equal" and $in is used to check if any of the tags in the event's tags array match the tags in the database
        return await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean()

    } catch (e) {
        return []
    }
}