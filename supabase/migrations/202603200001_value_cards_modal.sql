alter table public.value_cards
  add column if not exists hover_text text,
  add column if not exists action_type text not null default 'link' check (action_type in ('link', 'modal')),
  add column if not exists modal_title text,
  add column if not exists modal_body text,
  add column if not exists modal_image_url text,
  add column if not exists modal_image_url_secondary text;

alter table public.value_cards
  alter column href drop not null;

update public.value_cards
set
  action_type = case
    when card_key in ('meaning', 'tradition', 'selfdefense', 'practice') then 'modal'
    else 'link'
  end,
  hover_text = case
    when hover_text is not null then hover_text
    when locale = 'cs' and card_key = 'meaning' then 'Disciplína, respekt a klid mysli rostou krok za krokem.'
    when locale = 'cs' and card_key = 'tradition' then 'Navazujeme na dojo kulturu a ověřený způsob výuky.'
    when locale = 'cs' and card_key = 'selfdefense' then 'Budujeme jistotu, vnímání situace i zdravé sebevědomí.'
    when locale = 'cs' and card_key = 'practice' then 'Trénujeme s jasnou strukturou a průběžnou zpětnou vazbou.'
    when locale = 'en' and card_key = 'meaning' then 'Discipline, respect and calm focus are built over time.'
    when locale = 'en' and card_key = 'tradition' then 'Our training follows proven principles with modern clarity.'
    when locale = 'en' and card_key = 'selfdefense' then 'We build situational awareness and steady decision-making.'
    when locale = 'en' and card_key = 'practice' then 'Every class has structure, progression and clear feedback.'
    else null
  end,
  modal_title = case
    when card_key in ('meaning', 'tradition', 'selfdefense', 'practice')
      then coalesce(modal_title, title)
    else modal_title
  end,
  modal_body = case
    when card_key in ('meaning', 'tradition', 'selfdefense', 'practice')
      then coalesce(
        modal_body,
        case
          when locale = 'cs'
            then 'TODO: Doplňte detailní text k této kartě. Můžete přidat příběh, přístup trenérů, konkrétní přínosy i praktické ukázky z tréninku.'
          else 'TODO: Add detailed content for this card. You can include coaching approach, real training examples and practical outcomes.'
        end
      )
    else modal_body
  end,
  modal_image_url = case
    when card_key in ('meaning', 'tradition', 'selfdefense', 'practice')
      then coalesce(modal_image_url, image_url)
    else modal_image_url
  end
where true;
