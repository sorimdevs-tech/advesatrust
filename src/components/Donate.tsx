
import { useState } from "react";
import {
  Heart,
  QrCode,
  Building2,
  Copy,
  CheckCircle2,
  MapPin,
  Phone,
} from "lucide-react";

export default function Donate() {
  const [showQR, setShowQR] = useState(true);
  const [copied, setCopied] = useState("");

  const bankDetails = {
    accountName: "Advesa Charitable Trust",
    bankName: "Union Bank of India",
    accountNumber: "497502010065553",
    ifsc: "UBIN0541231",
    branch: "Nungambakkam",
  };

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const allBankDetailsText = `Account Name: ${bankDetails.accountName}
Account Number: ${bankDetails.accountNumber}
Bank Name: ${bankDetails.bankName}
Branch: ${bankDetails.branch}
IFSC Code: ${bankDetails.ifsc}`;

  return (
    <section
      id="donate"
      className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-500 py-20"
    >
      {/* Background */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mb-14 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-white backdrop-blur-md">
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            Support Our Cause
          </div>

          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Support Children's Education
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">
            Every contribution creates opportunities for underprivileged
            children through education, scholarships, and skill development.
          </p>
        </div>

        {/* Main Cards */}

        <div className="grid gap-8 lg:grid-cols-2">

          {/* QR CARD */}

          <div className="flex h-full flex-col rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-3">
                <QrCode className="h-6 w-6 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  Scan & Donate
                </h3>

                <p className="text-sm text-white/70">
                  UPI Payment
                </p>
              </div>
            </div>

            <div className="mb-6 rounded-xl bg-white/10 px-4 py-3 text-center">
              <p className="text-sm text-white">
                Donations are eligible under
                <span className="font-semibold">
                  {" "}
                  Section 80G
                </span>
              </p>

              <p className="mt-1 text-xs text-white/60">
                PAN : AACTA4113E
              </p>
            </div>

            {showQR ? (
              <>
                <div className="flex flex-1 items-center justify-center rounded-2xl bg-white p-5">

                  <img
                    src="/qe_advesa_trust.jpeg"
                    alt="QR"
                    className="w-72 object-contain"
                  />

                </div>

                <p className="mt-5 text-center text-sm text-white/70">
                  Scan using Google Pay, PhonePe, Paytm or any UPI App.
                </p>

                <button
                  onClick={() => setShowQR(false)}
                  className="mt-6 rounded-xl border border-white/20 bg-white/10 py-3 font-medium text-white transition hover:bg-white/20"
                >
                  Hide QR
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowQR(true)}
                className="rounded-xl bg-white py-4 font-semibold text-brand-600 transition hover:bg-gray-100"
              >
                Show QR Code
              </button>
            )}
          </div>

          {/* BANK CARD */}

          <div className="flex h-full flex-col rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-3">
                <Building2 className="h-6 w-6 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  Bank Transfer
                </h3>

                <p className="text-sm text-white/70">
                  NEFT / RTGS / IMPS
                </p>
              </div>
            </div>

            {[
              {
                label: "Account Name",
                value: bankDetails.accountName,
                key: "account",
              },
              {
                label: "Bank Name",
                value: bankDetails.bankName,
                key: "bank",
              },
              {
                label: "Account Number",
                value: bankDetails.accountNumber,
                key: "number",
              },
              {
                label: "IFSC Code",
                value: bankDetails.ifsc,
                key: "ifsc",
              },
              {
                label: "Branch",
                value: bankDetails.branch,
                key: "branch",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="mb-4 flex items-center justify-between rounded-xl bg-white/5 p-4"
              >
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/60">
                    {item.label}
                  </p>

                  <p className="mt-1 font-semibold text-white">
                    {item.value}
                  </p>
                </div>

                <button
                  onClick={() =>
                    copyText(item.value, item.key)
                  }
                  className="rounded-lg bg-white/10 p-2 transition hover:bg-white/20"
                >
                  {copied === item.key ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : (
                    <Copy className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            ))}

            <button
              onClick={() =>
                copyText(allBankDetailsText, "all")
              }
              className="mt-auto rounded-xl bg-white py-3 font-semibold text-brand-600 transition hover:bg-gray-100"
            >
              {copied === "all"
                ? "Copied Successfully"
                : "Copy All Bank Details"}
            </button>
          </div>
        </div>

        {/* Contact */}

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2 text-white">
              <MapPin className="h-5 w-5 text-red-400" />

              <h4 className="font-semibold">
                Visit Us
              </h4>
            </div>

            <p className="text-sm leading-7 text-white/70">
              Flat 5, Block 2, Third Floor,
              Pace Prana Apartment,
              Padikuppam Road,
              Chennai - 600040.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
            <div className="mb-3 flex items-center gap-2 text-white">
              <Phone className="h-5 w-5 text-red-400" />

              <h4 className="font-semibold">
                Contact Us
              </h4>
            </div>

            <div className="space-y-2 text-sm text-white/70">
              <p>advesatrust@hotmail.com</p>
              <p>+91 9962258091</p>
              <p>+91 9176228387</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
