# Sign-up Form

A sign-up form built for The Odin Project (Intermediate HTML and CSS).

## Design

Built from the provided [design file](https://cdn.statically.io/gh/TheOdinProject/curriculum/afdbabfab03fbc34783c6b6f3920aba4a4d3b935/intermediate_html_css/forms/project_sign_up_form/imgs/sign-up-form.png).

- Background image: [Unsplash](https://unsplash.com/photos/25xggax4bSA) — credit the creator here
- Logo font: [Norse Bold](https://www.joelcarrouche.com/fonts/norse)
- Sidebar logo: Odin logo (TheOdinProject)

## Notes

- The ODIN logo sits on a dark, semi-transparent div to stay readable against the busy background image.
- Create Account button: `#596D48`, picked to match tones in the background.
- Inputs use a light default border (`#E5E7EB`).
- Invalid password inputs get a red border via `:user-invalid`.
- The focused input gets a blue border and a subtle box-shadow via `:focus`.
- Desktop only — responsive design comes later in the curriculum.
- Password fields are validated separately; matching them against each other needs JavaScript, covered in a later lesson.

## Build order

1. Scaffold the page structure.
2. Build each section one at a time.
3. Style states last.
