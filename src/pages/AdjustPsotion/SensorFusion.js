import { matrix, multiply, add, subtract, identity, inv } from 'mathjs';

class AdaptiveFilter {
  constructor(initialEstimate, initialCovariance, lambda) {
    this.estimate = matrix(initialEstimate);
    this.covariance = matrix(initialCovariance);
    this.lambda = lambda; // Forgetting factor
  }

  update(measurement) {
    // Calculate Kalman gain
    const gain = multiply(
      this.covariance,
      multiply(this.estimate, inv(add(this.lambda, multiply(multiply(measurement, this.covariance), measurement))))
    );

    // Calculate estimation error
    const error = subtract(measurement, multiply(this.estimate, measurement));

    // Update estimate
    this.estimate = add(this.estimate, multiply(gain, error));

    // Update covariance
    this.covariance = multiply(this.covariance, subtract(identity(this.covariance.size()[0]), multiply(multiply(measurement, this.covariance), measurement)));

    return this.estimate.toArray();
  }
}

export default AdaptiveFilter;
