package string;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.IntStream;

public class Decoder {
    public int[] uncompress(final String music) {
	return Arrays.stream(music.split(","))
	    .map(Decoder::parse)
	    .flatMapToInt(Arrays::stream)
	    .toArray();
    }

    public final static Pattern intervalPattern = Pattern
	.compile("^(?:(-?\\d+)(?:\\*(\\d+))?|(-?\\d+)-(-?\\d+)(?:/(\\d+))?)$");

    public static int[] parse(String expr) {
	Matcher matcher = intervalPattern.matcher(expr);
	matcher.find();
	if (matcher.group(1) != null) {
	    final int note = Integer.parseInt(matcher.group(1));
	    final int count = matcher.group(2) != null ? Integer.parseInt(matcher.group(2)) : 1;
	    return IntStream.generate(() -> note).limit(count).toArray();
	} else if (matcher.group(3) != null && matcher.group(4) != null) {
	    final int boundary1 = Integer.parseInt(matcher.group(3));
	    final int boundary2 = Integer.parseInt(matcher.group(4));
	    final int interval =
		(boundary1 <= boundary2 ? 1 : -1) * (matcher.group(5) == null ? 1 : Integer.parseInt(matcher.group(5)));
	    final int count = (int) Math.floor(Math.abs((boundary1 - boundary2) / interval)) + 1;
	    return IntStream.iterate(boundary1, prev -> prev + interval).limit(count).toArray();
	}
	return new int[] {};
    }

    public static void main(String[] args) {
	Decoder decoder = new Decoder();
	int[] result = decoder.uncompress("-2*2");
	System.out.println(Arrays.toString(result));
    }
}
