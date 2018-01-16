import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Card {

    enum Suit {CLUBS, DIAMONDS, HEARTS, SPADES}

    enum Rank {ACE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, JACK, QUEEN, KING}

    private Suit suit;

    private Rank rank;

    Card(Rank rank, Suit suit) {
	this.rank = rank;
	this.suit = suit;
    }

    @Override
    public String toString() {
	return String.format("%s of %s", rank.toString().toLowerCase(), suit.toString().toLowerCase());
    }

    public Card valueOf(String rank, String suit) {
	return new Card(Rank.valueOf(rank.toLowerCase()), Suit.valueOf(suit.toLowerCase()));
    }

    public static void main(String[] args) {
	List<Card> deck = new ArrayList<>(52);
	for (Suit suit : Suit.values()) {
	    for (Rank rank : Rank.values()) {
		deck.add(new Card(rank, suit));
	    }
	}
	Collections.shuffle(deck);
	for (int i = 1; i < 52; i++) {
	    System.out.println(deck.get(i));
	}
    }
}
