public class Calories {
    Integer from, to;

    public Calories(Integer f) {
	this(f, null);
    }

    public Calories(Integer f, Integer t) {
	if (f == null && t != null)
	    throw new IllegalArgumentException("When 'to' is not null, 'from' must be not null too");
	else if (f != null && t != null && f >= t)
	    throw new IllegalArgumentException("When both 'to' and 'from' are set, it must stand that: to < from");

	from = normalize(f);
	to = normalize(t);
    }

    private Integer normalize(Integer val) {
	if (val != null) {
	    if (val < 5) {
		return 0;
	    } else if (val <= 50) {
		return Math.round((float) val / 5) * 5;
	    } else {
		return Math.round((float) val / 10) * 10;
	    }
	}
	return null;
    }

    @Override
    public String toString() {
	String formatted = "";
	if (from != null) {
	    formatted = from + (to != null && !from.equals(to) ? "-" + to : "") + " kcal";
	}
	return formatted;
    }

    public static void main(String[] args) {
	System.out.println(new Calories(2, 8));
	System.out.println(new Calories(5, 11));
	System.out.println(new Calories(531, 876));
	System.out.println(new Calories(33));
	System.out.println(new Calories(50));
	System.out.println(new Calories(51));
	System.out.println(new Calories(55));
	System.out.println(new Calories(56));
	System.out.println(new Calories(99));
	System.out.println(new Calories(103));
	System.out.println(new Calories(105));
	System.out.println(new Calories(1857));
    }
}