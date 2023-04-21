import reviewDAO from "/dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next){
        try{
            const movieId = req.body.movieId
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await reviewDAO.addReview(
                movieId,
                user,
                review
            )
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }

    static async apiGetReview(req, res, next){
        try{
            let id = req.params.id || {}
            let review = await reviewDAO.getReview(id)
            if (!review){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(review)
        } catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiUpdateReview(req, res, next){
        try{
            const movieId = req.params.id
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await reviewDAO.updateReview(
                movieId,
                user,
                review
            )

            var { error } = reviewResponse
            if (error) {
                res.status(404).json({error: "Not found"})
            }

            if (review.modifiedCount === 0){
                throw new Error(
                    "Unable to update review"
                )
            }

            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }


    static async apiGetReviews(req, res, next){
        try{
            const reveiwId = req.params.id
            const reviewResponse = await reviewDAO.deleteReview(reveiwId)
            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }


    static async apiGetReviews(req, res, next){
        try{
            let id = req.params.id || {}
            let reviews = await reviewDAO.getReviewsByMovieId(id)
            if (!reviews){
                res.status(404).json({error: "Not found"})
                return
            }
            res.json(reviews)
        } catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

}