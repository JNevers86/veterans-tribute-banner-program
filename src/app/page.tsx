"use client";

import { type ChangeEvent, type FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Download,
  FileCheck2,
  FileSpreadsheet,
  Flag,
  FolderArchive,
  PackageCheck,
  Printer,
  ShieldCheck,
  UploadCloud
} from "lucide-react";
import styles from "./page.module.css";

type ProgramInquiryFormState = {
  organizationName: string;
  organizationType: string;
  contactName: string;
  email: string;
  phone: string;
  townCity: string;
  state: string;
  approximateQuantity: string;
  desiredDisplayDate: string;
  townPoleApproval: string;
  bracketsInstallation: string;
  needsSampleFlyer: string;
  notes: string;
};

type ExistingProgramSubmissionState = {
  programCode: string;
  sponsorName: string;
  sponsorEmail: string;
  sponsorPhone: string;
  veteranName: string;
  rank: string;
  branch: string;
  conflict: string;
  yearsServed: string;
  notes: string;
};

type AcknowledgementsState = {
  photoPermission: boolean;
  approvedProgram: boolean;
  noBrackets: boolean;
  localPermissions: boolean;
  proofApproval: boolean;
};

type AdminEntry = {
  veteranName: string;
  branch: string;
  photoStatus: string;
  proofStatus: string;
  approvalStatus: string;
};

const initialInquiryForm: ProgramInquiryFormState = {
  organizationName: "",
  organizationType: "",
  contactName: "",
  email: "",
  phone: "",
  townCity: "",
  state: "ME",
  approximateQuantity: "",
  desiredDisplayDate: "",
  townPoleApproval: "",
  bracketsInstallation: "",
  needsSampleFlyer: "",
  notes: ""
};

const initialSubmissionForm: ExistingProgramSubmissionState = {
  programCode: "",
  sponsorName: "",
  sponsorEmail: "",
  sponsorPhone: "",
  veteranName: "",
  rank: "",
  branch: "",
  conflict: "",
  yearsServed: "",
  notes: ""
};

const initialAcknowledgements: AcknowledgementsState = {
  photoPermission: false,
  approvedProgram: false,
  noBrackets: false,
  localPermissions: false,
  proofApproval: false
};

const organizationTypes = [
  "American Legion Post",
  "VFW",
  "Town / Municipality",
  "Veterans Committee",
  "Historical Society",
  "Other Community Group"
];

const approvalOptions = ["Yes", "No", "In progress", "Not sure"];

const branchOptions = [
  "U.S. Army",
  "U.S. Navy",
  "U.S. Air Force",
  "U.S. Marine Corps",
  "U.S. Coast Guard",
  "U.S. Space Force",
  "National Guard",
  "Other / Multiple"
];

const pricingTiers = [
  {
    label: "Starter programs",
    min: 1,
    max: 9,
    price: "$150 each",
    note: "For programs under 10 banners."
  },
  {
    label: "10+ banners",
    min: 10,
    max: 24,
    price: "$135 each",
    note: "Common starter level for posts and towns."
  },
  {
    label: "25+ banners",
    min: 25,
    max: 49,
    price: "$125 each",
    note: "Built for organized group orders."
  },
  {
    label: "50+ banners",
    min: 50,
    max: Number.POSITIVE_INFINITY,
    price: "$115 each",
    note: "Best pricing level for large community programs."
  }
];

const howItWorksSteps = [
  "Your post/town starts a banner program",
  "Families or sponsors submit veteran photos and information",
  "We place each veteran into the approved banner template",
  "Your organization reviews and approves proofs",
  "Banners are produced and delivered/shipped to the organization"
];

const organizationResponsibilities = [
  "Promoting the program locally",
  "Town or pole permissions",
  "Brackets and installation",
  "Collecting sponsor/family information",
  "Choosing local deadlines",
  "Approving final proofs"
];

const productionResponsibilities = [
  "Banner design template",
  "Personalized layout",
  "Photo placement",
  "Proof files",
  "Banner production",
  "Organized order handling"
];

const includedItems = [
  '20" x 40" double-sided banner',
  "18 oz banner material",
  '1" pole pocket top and bottom',
  "Personalized veteran layout",
  "Digital proof",
  "Free hard-copy proof of the actual banner",
  "Group order organization",
  "Production coordination"
];

const notIncludedItems = [
  "Brackets",
  "Installation",
  "Pole permissions",
  "Town approvals",
  "Utility permissions",
  "Advanced photo restoration unless quoted separately"
];

const trustBullets = [
  "Real print company",
  "Proof approval before production",
  "Respectful veteran-focused layouts",
  "Organized group order workflow",
  "Clear bracket/installation boundaries",
  "Parent company links"
];

const faqItems = [
  {
    question: "Do you sell individual banners?",
    answer:
      "This program works best through a town, American Legion post, VFW, or community organization. Individual submissions are usually collected through an approved local program."
  },
  {
    question: "Do you provide brackets?",
    answer: "No. Brackets are not included."
  },
  {
    question: "Do you install the banners?",
    answer: "No. Installation is handled by the town, post, or local organization."
  },
  {
    question: "Who gets pole approval?",
    answer:
      "The local organization is responsible for town, pole, utility, and installation permissions."
  },
  {
    question: "Can family members sponsor banners?",
    answer: "Yes, many organizations collect sponsorships from families or local businesses."
  },
  {
    question: "Can you use old military photos?",
    answer:
      "Yes, but photo quality affects final print quality. We will review photos and flag concerns."
  },
  {
    question: "Do we approve proofs?",
    answer: "Yes. Final proof approval is required before production."
  },
  {
    question: "Can one post submit a group order?",
    answer: "Yes. This is the preferred workflow."
  },
  {
    question: "How long does production take?",
    answer:
      "Production timing depends on quantity, proof approvals, and vendor schedule. Final timing is confirmed before ordering."
  }
];

const initialAdminEntries: AdminEntry[] = [
  {
    veteranName: "Albert Cobb Skilling",
    branch: "U.S. Army Infantry",
    photoStatus: "Photo placed",
    proofStatus: "Proof sent",
    approvalStatus: "Approved"
  },
  {
    veteranName: "Ethelbert W. Plummer",
    branch: "Army",
    photoStatus: "Replacement received",
    proofStatus: "Needs review",
    approvalStatus: "Pending"
  },
  {
    veteranName: "Robert A. Schlegel",
    branch: "U.S. Navy",
    photoStatus: "Photo placed",
    proofStatus: "Proof sent",
    approvalStatus: "Waiting"
  },
  {
    veteranName: "Walter Scott",
    branch: "U.S. Army",
    photoStatus: "Crop flagged",
    proofStatus: "Revision needed",
    approvalStatus: "Pending"
  }
];

const futureWorkflowItems = [
  { Icon: FileSpreadsheet, label: "Export CSV" },
  { Icon: Download, label: "Download photos" },
  { Icon: FolderArchive, label: "Generate organized folders" },
  { Icon: FileCheck2, label: "Track proof status" },
  { Icon: PackageCheck, label: "Track production status" }
];

/* Future workflow TODOs:
   TODO: save program inquiries to database.
   TODO: save veteran submissions to database.
   TODO: upload photos to storage.
   TODO: generate organized folders per program/town/veteran.
   TODO: export CSV for design automation.
   TODO: connect submissions to a Codex/template workflow.
   TODO: generate proofs.
   TODO: track proof approval status.
   TODO: email notifications to staff.
   TODO: email confirmations to submitters.
   TODO: collect payment/deposit.
   TODO: create production orders.
   TODO: track shipping/delivery.
*/

export default function VeteransBannerProgramPage() {
  const [inquiryForm, setInquiryForm] = useState<ProgramInquiryFormState>(initialInquiryForm);
  const [submissionForm, setSubmissionForm] =
    useState<ExistingProgramSubmissionState>(initialSubmissionForm);
  const [acknowledgements, setAcknowledgements] =
    useState<AcknowledgementsState>(initialAcknowledgements);
  const [photoFileName, setPhotoFileName] = useState("");
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [adminEntries, setAdminEntries] = useState<AdminEntry[]>(initialAdminEntries);

  const approximateQuantity = Number.parseInt(inquiryForm.approximateQuantity, 10);
  const selectedPricingTier = useMemo(() => {
    if (!Number.isFinite(approximateQuantity) || approximateQuantity < 1) {
      return null;
    }

    return pricingTiers.find(
      (tier) => approximateQuantity >= tier.min && approximateQuantity <= tier.max
    );
  }, [approximateQuantity]);

  function updateInquiryField<K extends keyof ProgramInquiryFormState>(
    field: K,
    value: ProgramInquiryFormState[K]
  ) {
    setInquiryForm((current) => ({ ...current, [field]: value }));
    if (inquirySuccess) {
      setInquirySuccess(false);
    }
  }

  function updateSubmissionField<K extends keyof ExistingProgramSubmissionState>(
    field: K,
    value: ExistingProgramSubmissionState[K]
  ) {
    setSubmissionForm((current) => ({ ...current, [field]: value }));
    if (submissionSuccess) {
      setSubmissionSuccess(false);
    }
  }

  function updateAcknowledgement<K extends keyof AcknowledgementsState>(
    field: K,
    value: AcknowledgementsState[K]
  ) {
    setAcknowledgements((current) => ({ ...current, [field]: value }));
    if (submissionSuccess) {
      setSubmissionSuccess(false);
    }
  }

  function handleProgramInquirySubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setInquirySuccess(true);
  }

  function handleExistingSubmissionSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newEntry: AdminEntry = {
      veteranName: submissionForm.veteranName || "New veteran submission",
      branch: submissionForm.branch || "Branch pending",
      photoStatus: photoFileName ? "Photo attached" : "Photo needed",
      proofStatus: "Needs layout",
      approvalStatus: "Pending"
    };

    setAdminEntries((current) => [newEntry, ...current]);
    setSubmissionSuccess(true);
    setSubmissionForm((current) => ({
      ...initialSubmissionForm,
      programCode: current.programCode
    }));
    setAcknowledgements(initialAcknowledgements);
    setPhotoFileName("");
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    setPhotoFileName(selectedFile?.name ?? "");
    if (submissionSuccess) {
      setSubmissionSuccess(false);
    }
  }

  return (
    <main className={styles.page}>
      <Hero />
      <ProgramModel />
      <HowItWorks />
      <Pricing selectedTierLabel={selectedPricingTier?.label ?? ""} />
      <ProgramInquiryForm
        form={inquiryForm}
        onFieldChange={updateInquiryField}
        onSubmit={handleProgramInquirySubmit}
        success={inquirySuccess}
        selectedPricingTier={selectedPricingTier}
      />
      <ExistingProgramSubmissionForm
        form={submissionForm}
        acknowledgements={acknowledgements}
        photoFileName={photoFileName}
        onFieldChange={updateSubmissionField}
        onAcknowledgementChange={updateAcknowledgement}
        onPhotoChange={handlePhotoChange}
        onSubmit={handleExistingSubmissionSubmit}
        success={submissionSuccess}
      />
      <AdminPreview entries={adminEntries} />
      <IncludedNotIncluded />
      <TrustSection />
      <FAQ />
      <ContactSection />
      <FinalCTA />
    </main>
  );
}

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroFlagField} aria-hidden="true" />
      <div className={styles.heroInner}>
        <nav className={styles.navBar} aria-label="Veterans Tribute Banner Program">
          <div className={styles.brandLockup}>
            <strong>Veterans Tribute Banner Program</strong>
            <span>A service of Printmail of Maine, Inc. and Atlantic Coastal Printing.</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#program-model">How it works</a>
            <a href="#pricing">Pricing</a>
            <a className={styles.navButton} href="#program-inquiry">
              Start a Program
            </a>
          </div>
        </nav>

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Organization-led tribute banner programs</p>
            <h1>
              Hometown Heroes Banner Programs for Towns, Posts &amp; Community Groups
            </h1>
            <p className={styles.heroLead}>
              Honor local veterans with custom 20&quot; x 40&quot; double-sided pole banners.
              Your organization leads the local program, collects the information, and we handle
              the banner layout, proofing, and production.
            </p>
            <div className={styles.heroButtons}>
              <a className={styles.primaryButton} href="#program-inquiry">
                Start a Banner Program
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className={styles.secondaryButton} href="#existing-program-submission">
                Submit Banner Info for an Existing Program
              </a>
            </div>
            <p className={styles.trustLine}>
              A service of Printmail of Maine, Inc. and Atlantic Coastal Printing.
            </p>
            <div className={styles.heroProofs} aria-label="Program safeguards">
              <span>
                <ShieldCheck size={16} aria-hidden="true" />
                Proof approval
              </span>
              <span>
                <Building2 size={16} aria-hidden="true" />
                Organization-led
              </span>
              <span>
                <Printer size={16} aria-hidden="true" />
                Real print production
              </span>
            </div>
          </div>

          <div className={styles.bannerVisual} aria-label="Sample veterans tribute banner layout">
            <div className={styles.bannerTop}>
              <span>Hometown Heroes</span>
            </div>
            <div className={styles.bannerPhoto}>
              <div className={styles.portraitCircle}>
                <ShieldCheck size={54} aria-hidden="true" />
              </div>
              <span>Veteran Photo</span>
            </div>
            <div className={styles.bannerName}>Veteran Name</div>
            <div className={styles.bannerBranch}>U.S. Army</div>
            <div className={styles.bannerDetails}>Rank / Era / Years Served</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramModel() {
  return (
    <section className={styles.sectionShell} id="program-model">
      <div className={styles.sectionIntro}>
        <p className={styles.kicker}>Program model</p>
        <h2>This works best as an organization-led program.</h2>
        <p>
          American Legion posts, VFWs, towns, veterans committees, and community groups lead the
          local effort. Families and sponsors can submit information through that approved program,
          while our team keeps the banner layout, proofing, and production workflow organized.
        </p>
        <p className={styles.scopeNote}>
          Designed for American Legion posts, VFWs, towns, and community groups. This is not an
          official national American Legion program.
        </p>
      </div>
      <div className={styles.responsibilityGrid}>
        <ChecklistPanel title="Your organization handles" items={organizationResponsibilities} />
        <ChecklistPanel title="We handle" items={productionResponsibilities} />
      </div>
    </section>
  );
}

function ChecklistPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <article className={styles.checkPanel}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <CheckCircle2 size={18} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function HowItWorks() {
  return (
    <section className={`${styles.sectionShell} ${styles.sectionSoft}`} id="how-it-works">
      <div className={styles.sectionIntro}>
        <p className={styles.kicker}>How it works</p>
        <h2>Simple enough for a local committee, structured enough for production.</h2>
      </div>
      <div className={styles.stepsGrid}>
        {howItWorksSteps.map((step, index) => (
          <article className={styles.stepCard} key={step}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <p>{step}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pricing({ selectedTierLabel }: { selectedTierLabel: string }) {
  return (
    <section className={styles.sectionShell} id="pricing">
      <div className={styles.sectionIntro}>
        <p className={styles.kicker}>Pricing</p>
        <h2>Editable placeholder pricing for banner-only group orders.</h2>
        <p>
          Pricing is for banners only. Brackets and installation are not included. Shipping or
          delivery may vary, and the final quote is confirmed before production.
        </p>
      </div>
      <div className={styles.pricingGrid}>
        {pricingTiers.map((tier) => (
          <article
            className={`${styles.pricingCard} ${
              selectedTierLabel === tier.label ? styles.pricingCardActive : ""
            }`}
            key={tier.label}
          >
            <span>{tier.label}</span>
            <strong>{tier.price}</strong>
            <p>{tier.note}</p>
          </article>
        ))}
      </div>
      <p className={styles.pricingNote}>
        Many organizations choose to sell sponsorships for more than the banner cost to help cover
        brackets, installation, or fundraising for the post/community.
      </p>
      <p className={styles.designTemplateNote}>
        Initial design template: choose from 4 free templates, or custom designs are available
        starting at $95.
      </p>
    </section>
  );
}

function ProgramInquiryForm({
  form,
  onFieldChange,
  onSubmit,
  success,
  selectedPricingTier
}: {
  form: ProgramInquiryFormState;
  onFieldChange: <K extends keyof ProgramInquiryFormState>(
    field: K,
    value: ProgramInquiryFormState[K]
  ) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  success: boolean;
  selectedPricingTier: (typeof pricingTiers)[number] | null | undefined;
}) {
  return (
    <section className={`${styles.sectionShell} ${styles.formSection}`} id="program-inquiry">
      <div className={styles.formIntro}>
        <p className={styles.kicker}>Start a Banner Program</p>
        <h2>Program inquiry for posts, towns, VFWs, and committees.</h2>
        <p>
          Tell us who is organizing the local program, how many banners you expect, and what pieces
          are already handled locally.
        </p>
      </div>
      <form className={styles.formCard} onSubmit={onSubmit}>
        <div className={styles.fieldGrid}>
          <label className={styles.field}>
            <span>Organization name</span>
            <input
              required
              value={form.organizationName}
              onChange={(event) => onFieldChange("organizationName", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Organization type</span>
            <select
              required
              value={form.organizationType}
              onChange={(event) => onFieldChange("organizationType", event.target.value)}
            >
              <option value="">Select type</option>
              {organizationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Contact name</span>
            <input
              required
              value={form.contactName}
              onChange={(event) => onFieldChange("contactName", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => onFieldChange("email", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Phone</span>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(event) => onFieldChange("phone", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Town/city</span>
            <input
              required
              value={form.townCity}
              onChange={(event) => onFieldChange("townCity", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>State</span>
            <input
              required
              value={form.state}
              onChange={(event) => onFieldChange("state", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Approximate quantity</span>
            <input
              required
              min="1"
              type="number"
              value={form.approximateQuantity}
              onChange={(event) => onFieldChange("approximateQuantity", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Desired display date</span>
            <input
              type="date"
              value={form.desiredDisplayDate}
              onChange={(event) => onFieldChange("desiredDisplayDate", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Do you already have town/pole approval?</span>
            <select
              required
              value={form.townPoleApproval}
              onChange={(event) => onFieldChange("townPoleApproval", event.target.value)}
            >
              <option value="">Select status</option>
              {approvalOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Do you already have brackets/installation handled?</span>
            <select
              required
              value={form.bracketsInstallation}
              onChange={(event) => onFieldChange("bracketsInstallation", event.target.value)}
            >
              <option value="">Select status</option>
              {approvalOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Need a sample flyer/order form?</span>
            <select
              required
              value={form.needsSampleFlyer}
              onChange={(event) => onFieldChange("needsSampleFlyer", event.target.value)}
            >
              <option value="">Select answer</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>
        </div>
        <label className={styles.field}>
          <span>Notes</span>
          <textarea
            rows={4}
            value={form.notes}
            onChange={(event) => onFieldChange("notes", event.target.value)}
          />
        </label>
        <div className={styles.formActions}>
          <button className={styles.primaryButton} type="submit">
            Submit Program Inquiry
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <p className={styles.liveEstimate} aria-live="polite">
            {selectedPricingTier
              ? `Current placeholder tier: ${selectedPricingTier.label}, ${selectedPricingTier.price}.`
              : "Enter an approximate quantity to preview the pricing tier."}
          </p>
        </div>
        {success ? (
          <p className={styles.successMessage} role="status">
            Program inquiry received. In a live version, this would create a staff review item and
            send a follow-up email.
          </p>
        ) : null}
      </form>
    </section>
  );
}

function ExistingProgramSubmissionForm({
  form,
  acknowledgements,
  photoFileName,
  onFieldChange,
  onAcknowledgementChange,
  onPhotoChange,
  onSubmit,
  success
}: {
  form: ExistingProgramSubmissionState;
  acknowledgements: AcknowledgementsState;
  photoFileName: string;
  onFieldChange: <K extends keyof ExistingProgramSubmissionState>(
    field: K,
    value: ExistingProgramSubmissionState[K]
  ) => void;
  onAcknowledgementChange: <K extends keyof AcknowledgementsState>(
    field: K,
    value: AcknowledgementsState[K]
  ) => void;
  onPhotoChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  success: boolean;
}) {
  return (
    <section
      className={`${styles.sectionShell} ${styles.formSection} ${styles.sectionSoft}`}
      id="existing-program-submission"
    >
      <div className={styles.formIntro}>
        <p className={styles.kicker}>Existing program submission</p>
        <h2>Veteran information for an approved town, post, or community program.</h2>
        <p>
          Individuals and families can submit banner details through a program code or
          program-specific link once a local organization has started the program.
        </p>
        <p className={styles.formNote}>
          Recommended workflow: the post, town, or committee shares this section with sponsors and
          families. If the organization collects paper forms, they can also enter each banner here
          one at a time.
        </p>
      </div>
      <form className={styles.formCard} onSubmit={onSubmit}>
        <label className={`${styles.field} ${styles.fullWidthField}`}>
          <span>Program code or town/program name</span>
          <input
            required
            placeholder="Example: GRAY-LEGION-2026"
            value={form.programCode}
            onChange={(event) => onFieldChange("programCode", event.target.value)}
          />
        </label>
        <div className={styles.fieldGrid}>
          <label className={styles.field}>
            <span>Sponsor/family contact name</span>
            <input
              required
              value={form.sponsorName}
              onChange={(event) => onFieldChange("sponsorName", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Sponsor/family email</span>
            <input
              required
              type="email"
              value={form.sponsorEmail}
              onChange={(event) => onFieldChange("sponsorEmail", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Sponsor/family phone</span>
            <input
              required
              type="tel"
              value={form.sponsorPhone}
              onChange={(event) => onFieldChange("sponsorPhone", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Veteran full name</span>
            <input
              required
              value={form.veteranName}
              onChange={(event) => onFieldChange("veteranName", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Rank, optional</span>
            <input
              value={form.rank}
              onChange={(event) => onFieldChange("rank", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Branch of service</span>
            <select
              required
              value={form.branch}
              onChange={(event) => onFieldChange("branch", event.target.value)}
            >
              <option value="">Select branch</option>
              {branchOptions.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>War/era/conflict, optional</span>
            <input
              value={form.conflict}
              onChange={(event) => onFieldChange("conflict", event.target.value)}
            />
          </label>
          <label className={styles.field}>
            <span>Years served, optional</span>
            <input
              value={form.yearsServed}
              onChange={(event) => onFieldChange("yearsServed", event.target.value)}
            />
          </label>
        </div>

        <label className={styles.uploadBox}>
          <UploadCloud size={25} aria-hidden="true" />
          <span>Photo upload placeholder</span>
          <input accept="image/*" type="file" onChange={onPhotoChange} />
          <small>{photoFileName || "No file selected. Live storage comes in the next phase."}</small>
        </label>

        <label className={styles.field}>
          <span>Notes</span>
          <textarea
            rows={4}
            value={form.notes}
            onChange={(event) => onFieldChange("notes", event.target.value)}
          />
        </label>

        <div className={styles.acknowledgements}>
          <CheckboxField
            checked={acknowledgements.photoPermission}
            label="I have permission to submit this photo and information."
            onChange={(checked) => onAcknowledgementChange("photoPermission", checked)}
          />
          <CheckboxField
            checked={acknowledgements.approvedProgram}
            label="I understand this submission is part of a town/post/community banner program."
            onChange={(checked) => onAcknowledgementChange("approvedProgram", checked)}
          />
          <CheckboxField
            checked={acknowledgements.noBrackets}
            label="I understand brackets and installation are not included."
            onChange={(checked) => onAcknowledgementChange("noBrackets", checked)}
          />
          <CheckboxField
            checked={acknowledgements.localPermissions}
            label="I understand town/pole permissions are handled by the local organization."
            onChange={(checked) => onAcknowledgementChange("localPermissions", checked)}
          />
          <CheckboxField
            checked={acknowledgements.proofApproval}
            label="I understand final proof approval is required before production."
            onChange={(checked) => onAcknowledgementChange("proofApproval", checked)}
          />
        </div>

        <div className={styles.formActions}>
          <button className={styles.primaryButton} type="submit">
            Submit Banner Information
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        {success ? (
          <p className={styles.successMessage} role="status">
            Banner information received. In a live version, this would be added to the selected
            program for staff review.
          </p>
        ) : null}
      </form>
    </section>
  );
}

function CheckboxField({
  checked,
  label,
  onChange
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className={styles.checkboxField}>
      <input
        required
        checked={checked}
        type="checkbox"
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function AdminPreview({ entries }: { entries: AdminEntry[] }) {
  return (
    <section className={styles.sectionShell}>
      <div className={styles.sectionIntro}>
        <p className={styles.kicker}>Program dashboard preview</p>
        <h2>How group banner orders can stay organized.</h2>
        <p>
          Submissions can be grouped by town or post so staff can review photos, build proofs,
          track approvals, and move the order into production.
        </p>
      </div>
      <div className={styles.adminLayout}>
        <article className={styles.adminSummary}>
          <Flag size={28} aria-hidden="true" />
          <h3>Gray American Legion Hometown Heroes</h3>
          <dl>
            <div>
              <dt>Quantity</dt>
              <dd>23 banners</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Proofing / Approved / Ordered / Complete</dd>
            </div>
          </dl>
        </article>

        <div className={styles.adminTableWrap}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>Veteran name</th>
                <th>Branch</th>
                <th>Photo status</th>
                <th>Proof status</th>
                <th>Approval status</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={`${entry.veteranName}-${entry.proofStatus}`}>
                  <td>{entry.veteranName}</td>
                  <td>{entry.branch}</td>
                  <td>{entry.photoStatus}</td>
                  <td>{entry.proofStatus}</td>
                  <td>{entry.approvalStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.workflowGrid}>
        {futureWorkflowItems.map((item) => (
          <article className={styles.workflowItem} key={item.label}>
            <item.Icon size={21} aria-hidden="true" />
            <span>{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function IncludedNotIncluded() {
  return (
    <section className={`${styles.sectionShell} ${styles.sectionSoft}`}>
      <div className={styles.sectionIntro}>
        <p className={styles.kicker}>Scope</p>
        <h2>Clear production boundaries from the beginning.</h2>
      </div>
      <div className={styles.scopeGrid}>
        <ChecklistPanel title="What's included" items={includedItems} />
        <article className={styles.checkPanel}>
          <h3>Not included</h3>
          <ul>
            {notIncludedItems.map((item) => (
              <li key={item}>
                <BadgeCheck size={18} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className={styles.sectionShell}>
      <div className={styles.trustGrid}>
        <div className={styles.trustCopy}>
          <p className={styles.kicker}>Real print production</p>
          <h2>Real print production behind every banner.</h2>
          <p>
            This program is produced by the same team behind Printmail of Maine, Inc. and Atlantic
            Coastal Printing. We help posts, towns, and community groups create organized,
            respectful tribute banner programs with proof approval before production.
          </p>
          <div className={styles.trustLinks}>
            <a href="https://www.printmailofmaine.com" rel="noreferrer" target="_blank">
              Printmail of Maine
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="https://www.atlanticcoastalprinting.com" rel="noreferrer" target="_blank">
              Atlantic Coastal Printing
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className={styles.logoPanel} aria-label="Parent company links">
          <img src="/printmail-logo-color.png" alt="Printmail of Maine" />
          <img src="/atlantic-coastal-print-signs-logo.webp" alt="Atlantic Coastal Printing" />
        </div>
      </div>
      <div className={styles.trustBulletGrid}>
        {trustBullets.map((bullet) => (
          <article className={styles.trustBullet} key={bullet}>
            <CheckCircle2 size={18} aria-hidden="true" />
            <span>{bullet}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className={`${styles.sectionShell} ${styles.sectionSoft}`}>
      <div className={styles.sectionIntro}>
        <p className={styles.kicker}>FAQ</p>
        <h2>Common questions for posts, towns, and families.</h2>
      </div>
      <div className={styles.faqGrid}>
        {faqItems.map((item) => (
          <article className={styles.faqItem} key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className={styles.contactSection} id="contact">
      <div className={styles.contactInner}>
        <div>
          <p className={styles.kicker}>Contact</p>
          <h2>Talk through a local banner program.</h2>
          <p>
            For questions, sample timelines, or help planning a post/town program, contact Jonathan
            Nevers.
          </p>
        </div>
        <div className={styles.contactCard}>
          <strong>Jonathan Nevers</strong>
          <a href="tel:12079397557">207-939-7557</a>
          <a href="mailto:jnevers@printmailofmaine.com">jnevers@printmailofmaine.com</a>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className={styles.finalCta}>
      <div className={styles.finalCtaInner}>
        <div>
          <p className={styles.kicker}>Ready when your group is</p>
          <h2>Ready to start a banner program in your town?</h2>
        </div>
        <div className={styles.heroButtons}>
          <a className={styles.primaryButton} href="#program-inquiry">
            Start a Banner Program
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className={styles.secondaryButton} href="#existing-program-submission">
            Submit Banner Info for an Existing Program
          </a>
        </div>
      </div>
    </section>
  );
}
