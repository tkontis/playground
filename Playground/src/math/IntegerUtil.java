package math;

import java.util.List;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toList;

public class IntegerUtil {

    public static int calculateDigitSum(int n) {
    	return String.valueOf(n).chars().map(Character::getNumericValue).reduce(0, Integer::sum);
    }

    public static List<Integer> calculateDivisors(int n) {
    	final int HALF = n/2;

	return IntStream.rangeClosed(1,HALF).filter(d->n%d==0)
	    .mapToObj(Integer::valueOf)
	    .collect(collectingAndThen(
		toList(),
		divisors -> {divisors.add(n); return divisors;})
	    );
    }

    public static int bestDivisor(int n) {
    	return calculateDivisors(n).stream().sorted((a,b)-> {
	    int sumA = calculateDigitSum(a), sumB = calculateDigitSum(b);
	    return sumA != sumB ? sumB - sumA : a - b;
	}).findFirst().orElse(-1);
    }


}
