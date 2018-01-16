package math;

import java.util.function.IntSupplier;
import java.util.stream.IntStream;

/**
 * Java 8 functional style implementation of Fibonacci series calculation
 * (from the book Java 8 in Action)
 * @since 8/22/2016.
 */
public class Fibonacci {

    public static int[] getFibonacci(int limit) {
	if (limit < 0) return new int[]{};
        return IntStream.generate(new IntSupplier() {
	    private int prev=1;
	    private int curr=1;

	    @Override
	    public int getAsInt() {
		int nextValue = prev + curr;
		int oldPrev = prev;
		prev = curr;
		curr = nextValue;
	        return oldPrev;
	    }
	}).limit(limit).toArray();
    }
}
