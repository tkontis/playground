package math;

import org.junit.Test;

import java.util.List;

import static math.IntegerUtil.bestDivisor;
import static math.IntegerUtil.calculateDigitSum;
import static math.IntegerUtil.calculateDivisors;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.core.Is.is;

public class IntegerUtilTest {
    @Test
    public void shouldCalculateDigitSum() throws Exception {
	assertThat(calculateDigitSum(123), is(6));
	assertThat(calculateDigitSum(1), is(1));
	assertThat(calculateDigitSum(10), is(1));
	assertThat(calculateDigitSum(5264), is(17));
    }

    @Test
    public void shouldFactorizeInteger() {
	List<Integer> divisors = calculateDivisors(5);
	assertThat(divisors, hasSize(2));
	assertThat(divisors, contains(1,5));

	divisors = calculateDivisors(12);
	assertThat(divisors, hasSize(6));
	assertThat(divisors, contains(1,2,3,4,6,12));

	divisors = calculateDivisors(17);
	assertThat(divisors, hasSize(2));
	assertThat(divisors, contains(1,17));

	divisors = calculateDivisors(21);
	assertThat(divisors, hasSize(4));
	assertThat(divisors, contains(1,3,7,21));

	divisors = calculateDivisors(60);
	assertThat(divisors, hasSize(12));
	assertThat(divisors, contains(1,2,3,4,5,6,10,12,15,20,30,60));
    }

    @Test
    public void shouldOrderByLargestDigitSumOrSmallerValue() {
    	int best = bestDivisor(5);
    	assertThat(best, is(5));

    	best = bestDivisor(12);
    	assertThat(best, is(6));

    	best = bestDivisor(21);
    	assertThat(best, is(7));

    	best = bestDivisor(24);
    	assertThat(best, is(8));

    	best = bestDivisor(60);
    	assertThat(best, is(6));

    	best = bestDivisor(15);
    	assertThat(best, is(15));
    }
}