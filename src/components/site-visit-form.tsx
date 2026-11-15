"use client";

import { useRef, useState, type FormEvent } from "react";

type Field = "name" | "email" | "type" | "postcode" | "message";

type Errors = Partial<Record<Field, string>>;

const TYPES = ["Kitchen", "Bathroom", "Extension", "Whole house", "Not sure yet"];

const inputClass =
  "mt-2 block w-full min-h-11 border border-line bg-paper px-3 py-3 text-base text-ink transition-colors focus:border-ink focus:outline-none focus-visible:outline-3 focus-visible:outline-offset-1 focus-visible:outline-brick aria-[invalid=true]:border-brick";

export function SiteVisitForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const next: Errors = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? "").trim();
    const postcode = String(data.get("postcode") ?? "").trim();

    if (name.length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please check the email address.";
    if (!TYPES.includes(type)) next.type = "Please choose the type of work.";
    if (!/^\d{4}$/.test(postcode)) next.postcode = "An Australian postcode has four digits.";

    setErrors(next);

    if (Object.keys(next).length > 0) {
      setStatus(null);
      const first = Object.keys(next)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    // Situs demo: tidak ada pengiriman sungguhan. Kalau nanti dipakai klien,
    // di sinilah panggilan ke Formspree ditaruh.
    setStatus("Concept project. Demo form, nothing was sent.");
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="text-sm font-semibold text-ink">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-brick">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-brick">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="type" className="text-sm font-semibold text-ink">
          Type of work
        </label>
        <select
          id="type"
          name="type"
          defaultValue=""
          aria-invalid={Boolean(errors.type)}
          aria-describedby={errors.type ? "type-error" : undefined}
          className={inputClass}
        >
          <option value="" disabled>
            Choose one
          </option>
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.type && (
          <p id="type-error" className="mt-2 text-sm text-brick">
            {errors.type}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="postcode" className="text-sm font-semibold text-ink">
          Postcode
        </label>
        <input
          id="postcode"
          name="postcode"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          aria-invalid={Boolean(errors.postcode)}
          aria-describedby={errors.postcode ? "postcode-error" : undefined}
          className={inputClass}
        />
        {errors.postcode && (
          <p id="postcode-error" className="mt-2 text-sm text-brick">
            {errors.postcode}
          </p>
        )}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="text-sm font-semibold text-ink">
          What you are planning <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={inputClass}
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center bg-brick px-6 font-semibold text-paper transition-colors hover:bg-ink"
        >
          Request a site visit
        </button>
        <p aria-live="polite" className="mt-4 min-h-6 text-sm text-ink-soft">
          {status ?? "Concept project. Demo form, no real bookings."}
        </p>
      </div>
    </form>
  );
}
