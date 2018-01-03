<?php declare(strict_types = 1);

namespace PHPDish\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180103115345 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE topics_threads (topic_id INT NOT NULL, thread_id INT NOT NULL, INDEX IDX_893220111F55203D (topic_id), INDEX IDX_89322011E2904019 (thread_id), PRIMARY KEY(topic_id, thread_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE topics_threads ADD CONSTRAINT FK_893220111F55203D FOREIGN KEY (topic_id) REFERENCES topics (id)');
        $this->addSql('ALTER TABLE topics_threads ADD CONSTRAINT FK_89322011E2904019 FOREIGN KEY (thread_id) REFERENCES threads (id)');
        $this->addSql('ALTER TABLE topics DROP FOREIGN KEY FK_91F64639E2904019');
        $this->addSql('DROP INDEX IDX_91F64639E2904019 ON topics');
        $this->addSql('ALTER TABLE topics DROP thread_id');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE topics_threads');
        $this->addSql('ALTER TABLE topics ADD thread_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE topics ADD CONSTRAINT FK_91F64639E2904019 FOREIGN KEY (thread_id) REFERENCES threads (id)');
        $this->addSql('CREATE INDEX IDX_91F64639E2904019 ON topics (thread_id)');
    }
}
