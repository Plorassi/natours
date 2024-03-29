/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  try {
    const stripe = Stripe(
      'pk_test_51IvxJxSEyuuNz64cHxTf75e4o68gD4I9ftAfVoXYvlHRoRaiHQWHDJJPevfzlcnlzLrHuNxwIGxn79SARslEz5k1001NaNs3BI'
    );
    //Get checkout session from api
    const session = await axios(`/api/v1/bookings/checkoutSession/${tourId}`);

    //use stripe obj to create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
