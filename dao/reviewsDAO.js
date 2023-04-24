import mongodb from "mongodb"

const ObjectID = mongodb.ObjectId;

let reviews

export default class ReviewsDao{
    static async injectDb(conn){
        if (reviews){
            return
        }
        try{
            reviews = await conn.db("reviews").collection("reviews")
        } catch(e){
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review){
        try {
            const reviewDoc = {
                movieId: movieId, 
                user: user,
                review: review
            }
            return await reviews.insertOne(reviewDoc)
        } catch(e){
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async getReview(reviewId){
        try {
            return await reviews.findOne({ _id: new ObjectID(reviewId) })
        } catch(e){
            console.error(`Unable to get review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, user, review){
        try {
            const updateResposne = await reviews.updateOne(
                { _id: new ObjectID(reviewId) },
                { $set: { user: user, review: review } }
            )
            return updateResposne
        } catch(e){
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId,){
        try {
            const deleteResposne = await reviews.deleteOne({
                _id: new ObjectID(reviewId),
        })
            return deleteResposne
        } catch(e){
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }

    static async getReviewsByMovieId(movieId){
        try {
            const cursor = await reviews.find({ movieId: parseInt(movieId) })
            return cursor.toArray()
        } catch(e){
            console.error(`Unable to get reviews: ${e}`)
            return { error: e }
        }
    }
}